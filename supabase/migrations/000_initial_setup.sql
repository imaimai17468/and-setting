-- ============================================
-- Initial Setup for Rule Sharing Platform
-- ============================================
-- このマイグレーションは、初期セットアップと
-- Drizzleで管理できないPostgreSQL固有の機能を含みます
-- ============================================

-- ============================================
-- 1. Create members table
-- ============================================
CREATE TABLE IF NOT EXISTS public.members (
  id VARCHAR(255) PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  icon_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- メンバーは全員のデータを閲覧可能
DROP POLICY IF EXISTS "members_select_policy" ON public.members;
CREATE POLICY "members_select_policy" ON public.members
  FOR SELECT
  TO authenticated
  USING (true);

-- メンバーは自分のデータのみ更新可能
DROP POLICY IF EXISTS "members_update_policy" ON public.members;
CREATE POLICY "members_update_policy" ON public.members
  FOR UPDATE
  TO authenticated
  USING (email = auth.jwt() ->> 'email')
  WITH CHECK (email = auth.jwt() ->> 'email');

-- ============================================
-- 2. Create follows table
-- ============================================
CREATE TABLE IF NOT EXISTS public.follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id VARCHAR(255) NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  following_id VARCHAR(255) NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Enable RLS
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

-- フォロー関係は全員が閲覧可能
DROP POLICY IF EXISTS "follows_select_policy" ON public.follows;
CREATE POLICY "follows_select_policy" ON public.follows
  FOR SELECT
  TO authenticated
  USING (true);

-- メンバーは自分のフォロー関係のみ作成・削除可能
DROP POLICY IF EXISTS "follows_insert_policy" ON public.follows;
CREATE POLICY "follows_insert_policy" ON public.follows
  FOR INSERT
  TO authenticated
  WITH CHECK (
    follower_id IN (
      SELECT id FROM public.members WHERE email = auth.jwt() ->> 'email'
    )
  );

DROP POLICY IF EXISTS "follows_delete_policy" ON public.follows;
CREATE POLICY "follows_delete_policy" ON public.follows
  FOR DELETE
  TO authenticated
  USING (
    follower_id IN (
      SELECT id FROM public.members WHERE email = auth.jwt() ->> 'email'
    )
  );

-- ============================================
-- 3. Create rules table
-- ============================================
CREATE TABLE IF NOT EXISTS public.rules (
  id VARCHAR(255) PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tool TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  member_id VARCHAR(255) NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.rules ENABLE ROW LEVEL SECURITY;

-- ルールは全員が閲覧可能
DROP POLICY IF EXISTS "rules_select_policy" ON public.rules;
CREATE POLICY "rules_select_policy" ON public.rules
  FOR SELECT
  TO authenticated
  USING (true);

-- メンバーは自分のルールのみ作成・更新・削除可能
DROP POLICY IF EXISTS "rules_insert_policy" ON public.rules;
CREATE POLICY "rules_insert_policy" ON public.rules
  FOR INSERT
  TO authenticated
  WITH CHECK (
    member_id IN (
      SELECT id FROM public.members WHERE email = auth.jwt() ->> 'email'
    )
  );

DROP POLICY IF EXISTS "rules_update_policy" ON public.rules;
CREATE POLICY "rules_update_policy" ON public.rules
  FOR UPDATE
  TO authenticated
  USING (
    member_id IN (
      SELECT id FROM public.members WHERE email = auth.jwt() ->> 'email'
    )
  )
  WITH CHECK (
    member_id IN (
      SELECT id FROM public.members WHERE email = auth.jwt() ->> 'email'
    )
  );

DROP POLICY IF EXISTS "rules_delete_policy" ON public.rules;
CREATE POLICY "rules_delete_policy" ON public.rules
  FOR DELETE
  TO authenticated
  USING (
    member_id IN (
      SELECT id FROM public.members WHERE email = auth.jwt() ->> 'email'
    )
  );

-- ============================================
-- 4. Create updated_at triggers
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Members table trigger
DROP TRIGGER IF EXISTS update_members_updated_at ON public.members;
CREATE TRIGGER update_members_updated_at 
  BEFORE UPDATE ON public.members
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Rules table trigger
DROP TRIGGER IF EXISTS update_rules_updated_at ON public.rules;
CREATE TRIGGER update_rules_updated_at 
  BEFORE UPDATE ON public.rules
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 5. Create function to handle new user signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_member()
RETURNS TRIGGER AS $$
DECLARE
  new_member_id VARCHAR(255);
BEGIN
  -- Generate a unique ID for the member
  new_member_id := 'member_' || gen_random_uuid()::text;
  
  INSERT INTO public.members (id, email, name, icon_url)
  VALUES (
    new_member_id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'name',
      NEW.raw_user_meta_data->>'user_name',
      NEW.raw_user_meta_data->>'full_name',
      split_part(NEW.email, '@', 1)
    ),
    COALESCE(
      NEW.raw_user_meta_data->>'avatar_url',
      NEW.raw_user_meta_data->>'icon_url',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=' || NEW.id::text
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic member creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_member();

-- ============================================
-- 6. Create indexes for performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_follows_follower_id ON public.follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following_id ON public.follows(following_id);
CREATE INDEX IF NOT EXISTS idx_rules_member_id ON public.rules(member_id);
CREATE INDEX IF NOT EXISTS idx_rules_tool ON public.rules(tool);
CREATE INDEX IF NOT EXISTS idx_rules_tags ON public.rules USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_members_email ON public.members(email);

-- ============================================
-- 7. Storage policies for icons bucket
-- ============================================
-- Note: The 'icons' bucket must be created via Supabase Dashboard before running this SQL

-- Policy 1: Anyone can view icon images (Public Read)
DROP POLICY IF EXISTS "Icon images are publicly accessible" ON storage.objects;
CREATE POLICY "Icon images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'icons');

-- Policy 2: Members can upload their own icon
DROP POLICY IF EXISTS "Members can upload their own icon" ON storage.objects;
CREATE POLICY "Members can upload their own icon"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'icons' AND 
  (storage.foldername(name))[1] IN (
    SELECT id FROM public.members WHERE email = auth.jwt() ->> 'email'
  )
);

-- Policy 3: Members can update their own icon
DROP POLICY IF EXISTS "Members can update their own icon" ON storage.objects;
CREATE POLICY "Members can update their own icon"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'icons' AND 
  (storage.foldername(name))[1] IN (
    SELECT id FROM public.members WHERE email = auth.jwt() ->> 'email'
  )
)
WITH CHECK (
  bucket_id = 'icons' AND 
  (storage.foldername(name))[1] IN (
    SELECT id FROM public.members WHERE email = auth.jwt() ->> 'email'
  )
);

-- Policy 4: Members can delete their own icon
DROP POLICY IF EXISTS "Members can delete their own icon" ON storage.objects;
CREATE POLICY "Members can delete their own icon"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'icons' AND 
  (storage.foldername(name))[1] IN (
    SELECT id FROM public.members WHERE email = auth.jwt() ->> 'email'
  )
);

-- ============================================
-- 8. Migrate existing auth users to members (if any)
-- ============================================
INSERT INTO public.members (id, email, name, icon_url)
SELECT
  'member_' || id::text,
  email,
  COALESCE(
    raw_user_meta_data->>'name',
    raw_user_meta_data->>'user_name',
    raw_user_meta_data->>'full_name',
    split_part(email, '@', 1)
  ) as name,
  COALESCE(
    raw_user_meta_data->>'avatar_url',
    raw_user_meta_data->>'icon_url',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=' || id::text
  ) as icon_url
FROM auth.users
WHERE email NOT IN (SELECT email FROM public.members)
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- Storage Structure:
-- icons/{member_id}/icon.{extension}
-- This ensures each member can only access their own folder
-- ============================================