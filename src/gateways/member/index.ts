import { and, eq, inArray, sql } from "drizzle-orm";
import {
	type Member,
	MemberSchema,
	type MemberWithEmail,
	MemberWithEmailSchema,
	type UpdateMember,
} from "@/entities/member";
import { db } from "@/lib/drizzle/db";
import { follows, members } from "@/lib/drizzle/schema";
import { isDevelopment } from "@/utils";
import { mockMemberArray } from "./testData";

export const fetchMemberById = async (
	memberId: string,
): Promise<Member | null> => {
	if (isDevelopment()) {
		// 開発環境でローディング状態を確認するため500ms遅延
		await new Promise((resolve) => setTimeout(resolve, 500));
		const member = mockMemberArray.find((m) => m.id === memberId);
		return Promise.resolve(member || null);
	}

	try {
		// メンバー情報を取得
		const result = await db
			.select({
				id: members.id,
				name: members.name,
				iconUrl: members.iconUrl,
				createdAt: members.createdAt,
				updatedAt: members.updatedAt,
				followerCount: sql<number>`(SELECT COUNT(*) FROM ${follows} WHERE following_id = ${members.id})`,
				followingCount: sql<number>`(SELECT COUNT(*) FROM ${follows} WHERE follower_id = ${members.id})`,
			})
			.from(members)
			.where(eq(members.id, memberId))
			.limit(1);

		if (!result.length) {
			return null;
		}

		// フォロワーとフォロー中のIDを取得
		const [followerData, followingData] = await Promise.all([
			db
				.select({ followerId: follows.followerId })
				.from(follows)
				.where(eq(follows.followingId, memberId)),
			db
				.select({ followingId: follows.followingId })
				.from(follows)
				.where(eq(follows.followerId, memberId)),
		]);

		const member: Member = {
			id: result[0].id,
			name: result[0].name,
			iconUrl: result[0].iconUrl || undefined,
			followerArray: followerData.map((f) => f.followerId),
			followingArray: followingData.map((f) => f.followingId),
			createdAt: result[0].createdAt.toISOString(),
			updatedAt: result[0].updatedAt.toISOString(),
		};

		return MemberSchema.parse(member);
	} catch (error) {
		console.error("Failed to fetch member:", error);
		return null;
	}
};

export const fetchMemberArray = async (): Promise<Member[]> => {
	if (isDevelopment()) {
		// 開発環境でローディング状態を確認するため1秒遅延
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return Promise.resolve(mockMemberArray);
	}

	try {
		// すべてのメンバー情報を取得
		const result = await db
			.select({
				id: members.id,
				name: members.name,
				iconUrl: members.iconUrl,
				createdAt: members.createdAt,
				updatedAt: members.updatedAt,
			})
			.from(members);

		if (!result.length) {
			return [];
		}

		const memberIds = result.map((m) => m.id);

		// フォロー関係を一括取得
		const followsData = await db
			.select({
				followerId: follows.followerId,
				followingId: follows.followingId,
			})
			.from(follows)
			.where(
				and(
					inArray(follows.followerId, memberIds),
					inArray(follows.followingId, memberIds),
				),
			);

		// フォロー関係をマップに変換
		const followerMap = new Map<string, string[]>();
		const followingMap = new Map<string, string[]>();

		followsData.forEach((f) => {
			// フォロワー
			if (!followerMap.has(f.followingId)) {
				followerMap.set(f.followingId, []);
			}
			followerMap.get(f.followingId)?.push(f.followerId);

			// フォロー中
			if (!followingMap.has(f.followerId)) {
				followingMap.set(f.followerId, []);
			}
			followingMap.get(f.followerId)?.push(f.followingId);
		});

		// メンバー情報を構築
		const memberArray: Member[] = result.map((m) => ({
			id: m.id,
			name: m.name,
			iconUrl: m.iconUrl || undefined,
			followerArray: followerMap.get(m.id) || [],
			followingArray: followingMap.get(m.id) || [],
			createdAt: m.createdAt.toISOString(),
			updatedAt: m.updatedAt.toISOString(),
		}));

		return MemberSchema.array().parse(memberArray);
	} catch (error) {
		console.error("Failed to fetch members:", error);
		return [];
	}
};

// Server Component専用
export const fetchCurrentMember = async (): Promise<MemberWithEmail | null> => {
	if (isDevelopment()) {
		// 開発環境でローディング状態を確認するため300ms遅延
		await new Promise((resolve) => setTimeout(resolve, 300));
		// モックデータとして最初のメンバーを現在のユーザーとして返す
		const currentMember = mockMemberArray[0];
		if (!currentMember) return null;

		const memberWithEmail: MemberWithEmail = {
			...currentMember,
			email: `${currentMember.id}@example.com`,
		};
		return MemberWithEmailSchema.parse(memberWithEmail);
	}

	try {
		// Supabaseの認証状態を確認
		const { createClient } = await import("@/lib/supabase/server");
		const supabase = await createClient();
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user?.email) {
			return null;
		}

		// 認証されたユーザーのメールアドレスでメンバーを検索
		const result = await db
			.select({
				id: members.id,
				name: members.name,
				iconUrl: members.iconUrl,
				email: members.email,
				createdAt: members.createdAt,
				updatedAt: members.updatedAt,
			})
			.from(members)
			.where(eq(members.email, user.email))
			.limit(1);

		if (!result.length) {
			return null;
		}

		// フォロワーとフォロー中のIDを取得
		const [followerData, followingData] = await Promise.all([
			db
				.select({ followerId: follows.followerId })
				.from(follows)
				.where(eq(follows.followingId, result[0].id)),
			db
				.select({ followingId: follows.followingId })
				.from(follows)
				.where(eq(follows.followerId, result[0].id)),
		]);

		const memberWithEmail: MemberWithEmail = {
			id: result[0].id,
			name: result[0].name,
			iconUrl: result[0].iconUrl || undefined,
			email: result[0].email,
			followerArray: followerData.map((f) => f.followerId),
			followingArray: followingData.map((f) => f.followingId),
			createdAt: result[0].createdAt.toISOString(),
			updatedAt: result[0].updatedAt.toISOString(),
		};

		return MemberWithEmailSchema.parse(memberWithEmail);
	} catch (error) {
		console.error("Failed to fetch current member:", error);
		return null;
	}
};

export const updateMember = async (
	memberId: string,
	data: UpdateMember,
): Promise<{ success: boolean; error?: string }> => {
	if (isDevelopment()) {
		// 開発環境では成功を返す
		await new Promise((resolve) => setTimeout(resolve, 500));
		console.log(`Updating member ${memberId} with data:`, data);
		return { success: true };
	}

	try {
		await db
			.update(members)
			.set({
				name: data.name,
				updatedAt: new Date(),
			})
			.where(eq(members.id, memberId));

		return { success: true };
	} catch (error) {
		console.error("Failed to update member:", error);
		return { success: false, error: "Failed to update profile" };
	}
};

export const updateMemberAvatar = async (
	memberId: string,
	file: File,
): Promise<{ success: boolean; error?: string; iconUrl?: string }> => {
	if (isDevelopment()) {
		// 開発環境では成功を返す
		await new Promise((resolve) => setTimeout(resolve, 800));
		console.log(`Updating avatar for member ${memberId}`, file.name);
		// モックのアバターURLを返す
		const iconUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${memberId}-new`;
		return { success: true, iconUrl };
	}

	try {
		// 本番環境では一時的にDicebearのURLを使用
		// TODO: Server Actions を使用してSupabase Storageにアップロード
		const iconUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${memberId}-${Date.now()}`;

		await db
			.update(members)
			.set({
				iconUrl,
				updatedAt: new Date(),
			})
			.where(eq(members.id, memberId));

		return { success: true, iconUrl };
	} catch (error) {
		console.error("Failed to update avatar:", error);
		return { success: false, error: "Failed to update avatar" };
	}
};
