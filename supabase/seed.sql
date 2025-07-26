-- Seed data for development
-- This file contains sample data for testing and development purposes

-- Insert sample members
INSERT INTO public.members (id, email, name, icon_url, created_at, updated_at) VALUES
  ('00000000-0000-0000-0000-000000000001', 'alice@example.com', 'Alice', 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000002', 'bob@example.com', 'Bob', 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000003', 'charlie@example.com', 'Charlie', 'https://api.dicebear.com/7.x/avataaars/svg?seed=charlie', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000004', 'david@example.com', 'David', 'https://api.dicebear.com/7.x/avataaars/svg?seed=david', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000005', 'eve@example.com', 'Eve', 'https://api.dicebear.com/7.x/avataaars/svg?seed=eve', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert follow relationships
INSERT INTO public.follows (follower_id, following_id, created_at) VALUES
  -- Alice follows Bob and Charlie
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', NOW()),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003', NOW()),
  -- Bob follows Alice and David
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', NOW()),
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000004', NOW()),
  -- Charlie follows everyone
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', NOW()),
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', NOW()),
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000004', NOW()),
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000005', NOW()),
  -- David follows Eve
  ('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000005', NOW()),
  -- Eve follows Alice
  ('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001', NOW())
ON CONFLICT (follower_id, following_id) DO NOTHING;

-- Insert sample rules
INSERT INTO public.rules (id, member_id, title, content, tool, tags, created_at, updated_at) VALUES
  -- Alice's rules
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 
   'VS Code 生産性向上設定', 
   'VS Codeで開発効率を上げるための設定集。キーバインド、拡張機能、snippetsなど。', 
   'vscode', 
   ARRAY['productivity', 'editor', 'shortcuts'], 
   NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days'),
  
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 
   'Git コミットメッセージ規約', 
   'チーム開発で統一されたコミットメッセージを書くためのルール。feat:, fix:, docs: などのプレフィックスを使用。', 
   'git', 
   ARRAY['git', 'commit', 'convention'], 
   NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days'),

  -- Bob's rules
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 
   'React パフォーマンス最適化', 
   'React.memo, useMemo, useCallbackを使った最適化テクニック。不要な再レンダリングを防ぐ方法。', 
   'react', 
   ARRAY['react', 'performance', 'optimization'], 
   NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),
  
  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000002', 
   'Next.js ベストプラクティス', 
   'App Router、Server Components、データフェッチングのベストプラクティス。', 
   'nextjs', 
   ARRAY['nextjs', 'react', 'best-practices'], 
   NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),

  -- Charlie's rules
  ('10000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000003', 
   'TypeScript 型定義テクニック', 
   'Utility Types、Conditional Types、Template Literal Typesを使った高度な型定義。', 
   'typescript', 
   ARRAY['typescript', 'types', 'advanced'], 
   NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
  
  ('10000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000003', 
   'Tailwind CSS カスタマイズ', 
   'カスタムカラー、アニメーション、プラグインの作成方法。', 
   'tailwind', 
   ARRAY['css', 'tailwind', 'styling'], 
   NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),

  -- David's rules
  ('10000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000004', 
   'Docker 開発環境構築', 
   'Docker Composeを使った開発環境の構築。データベース、Redis、アプリケーションコンテナの設定。', 
   'docker', 
   ARRAY['docker', 'devops', 'environment'], 
   NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
  
  ('10000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000004', 
   'GitHub Actions CI/CD', 
   'テスト自動化、ビルド、デプロイのワークフロー設定。', 
   'github', 
   ARRAY['ci-cd', 'github', 'automation'], 
   NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),

  -- Eve's rules
  ('10000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000005', 
   'Supabase 認証実装', 
   'Supabase Authを使ったメール認証、OAuth認証の実装方法。RLSポリシーの設定。', 
   'supabase', 
   ARRAY['supabase', 'auth', 'security'], 
   NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
  
  ('10000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000005', 
   'Drizzle ORM 使い方', 
   'Drizzle ORMでのスキーマ定義、マイグレーション、クエリビルダーの使い方。', 
   'drizzle', 
   ARRAY['database', 'orm', 'sql'], 
   NOW(), NOW())
ON CONFLICT (id) DO NOTHING;