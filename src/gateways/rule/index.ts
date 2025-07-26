import { desc, eq, inArray } from "drizzle-orm";
import { type Rule, RuleSchema, type Tool } from "@/entities/rule";
import { db } from "@/lib/drizzle/db";
import { follows, members, rules } from "@/lib/drizzle/schema";
import { isDevelopment } from "@/utils";
import { mockRuleArray } from "./testData";

// ヘルパー関数：メンバーIDのリストからフォロー関係を取得
const fetchFollowRelations = async (
	memberIds: string[],
): Promise<{
	followerMap: Map<string, string[]>;
	followingMap: Map<string, string[]>;
}> => {
	const followerMap = new Map<string, string[]>();
	const followingMap = new Map<string, string[]>();

	// 初期化
	for (const memberId of memberIds) {
		followerMap.set(memberId, []);
		followingMap.set(memberId, []);
	}

	if (memberIds.length === 0) {
		return { followerMap, followingMap };
	}

	// フォロワーを取得
	const followersData = await db
		.select({
			followerId: follows.followerId,
			followingId: follows.followingId,
		})
		.from(follows)
		.where(inArray(follows.followingId, memberIds));

	followersData.forEach((f) => {
		followerMap.get(f.followingId)?.push(f.followerId);
	});

	// フォロー中を取得
	const followingData = await db
		.select({
			followerId: follows.followerId,
			followingId: follows.followingId,
		})
		.from(follows)
		.where(inArray(follows.followerId, memberIds));

	followingData.forEach((f) => {
		followingMap.get(f.followerId)?.push(f.followingId);
	});

	return { followerMap, followingMap };
};

export const fetchRuleArray = async (): Promise<Rule[]> => {
	if (isDevelopment()) {
		// 開発環境でローディング状態を確認するため500ms遅延
		await new Promise((resolve) => setTimeout(resolve, 500));
		return Promise.resolve(mockRuleArray);
	}

	try {
		const result = await db
			.select({
				id: rules.id,
				title: rules.title,
				content: rules.content,
				tool: rules.tool,
				tags: rules.tags,
				memberId: rules.memberId,
				memberName: members.name,
				memberIconUrl: members.iconUrl,
				memberCreatedAt: members.createdAt,
				memberUpdatedAt: members.updatedAt,
				ruleCreatedAt: rules.createdAt,
				ruleUpdatedAt: rules.updatedAt,
			})
			.from(rules)
			.leftJoin(members, eq(rules.memberId, members.id))
			.orderBy(desc(rules.createdAt));

		// メンバーIDのリストを作成
		const memberIds = [...new Set(result.map((r) => r.memberId))];

		// フォロー関係を取得
		const { followerMap, followingMap } = await fetchFollowRelations(memberIds);

		const ruleArray: Rule[] = result.map((r) => ({
			id: r.id,
			member: {
				id: r.memberId,
				name: r.memberName || "Unknown",
				iconUrl: r.memberIconUrl || undefined,
				followerArray: followerMap.get(r.memberId) || [],
				followingArray: followingMap.get(r.memberId) || [],
				createdAt: r.memberCreatedAt?.toISOString() || new Date().toISOString(),
				updatedAt: r.memberUpdatedAt?.toISOString() || new Date().toISOString(),
			},
			title: r.title,
			contentArray: [
				{
					title: r.title,
					content: r.content,
				},
			],
			toolArray: [r.tool as Tool],
			tagArray: r.tags,
			createdAt: r.ruleCreatedAt.toISOString(),
			updatedAt: r.ruleUpdatedAt.toISOString(),
		}));

		return RuleSchema.array().parse(ruleArray);
	} catch (error) {
		console.error("Failed to fetch rules:", error);
		return [];
	}
};

export const fetchRuleById = async (ruleId: string): Promise<Rule | null> => {
	if (isDevelopment()) {
		// 開発環境でローディング状態を確認するため500ms遅延
		await new Promise((resolve) => setTimeout(resolve, 500));
		const rule = mockRuleArray.find((r) => r.id === ruleId);
		return Promise.resolve(rule || null);
	}

	try {
		const result = await db
			.select({
				id: rules.id,
				title: rules.title,
				content: rules.content,
				tool: rules.tool,
				tags: rules.tags,
				memberId: rules.memberId,
				memberName: members.name,
				memberIconUrl: members.iconUrl,
				memberCreatedAt: members.createdAt,
				memberUpdatedAt: members.updatedAt,
				ruleCreatedAt: rules.createdAt,
				ruleUpdatedAt: rules.updatedAt,
			})
			.from(rules)
			.leftJoin(members, eq(rules.memberId, members.id))
			.where(eq(rules.id, ruleId))
			.limit(1);

		if (!result.length) {
			return null;
		}

		const r = result[0];

		// フォロー関係を取得
		const { followerMap, followingMap } = await fetchFollowRelations([
			r.memberId,
		]);

		const rule: Rule = {
			id: r.id,
			member: {
				id: r.memberId,
				name: r.memberName || "Unknown",
				iconUrl: r.memberIconUrl || undefined,
				followerArray: followerMap.get(r.memberId) || [],
				followingArray: followingMap.get(r.memberId) || [],
				createdAt: r.memberCreatedAt?.toISOString() || new Date().toISOString(),
				updatedAt: r.memberUpdatedAt?.toISOString() || new Date().toISOString(),
			},
			title: r.title,
			contentArray: [
				{
					title: r.title,
					content: r.content,
				},
			],
			toolArray: [r.tool as Tool],
			tagArray: r.tags,
			createdAt: r.ruleCreatedAt.toISOString(),
			updatedAt: r.ruleUpdatedAt.toISOString(),
		};

		return RuleSchema.parse(rule);
	} catch (error) {
		console.error("Failed to fetch rule:", error);
		return null;
	}
};

export const fetchRulesByMemberId = async (
	memberId: string,
): Promise<Rule[]> => {
	if (isDevelopment()) {
		// 開発環境でローディング状態を確認するため500ms遅延
		await new Promise((resolve) => setTimeout(resolve, 500));
		const memberRules = mockRuleArray.filter(
			(rule) => rule.member.id === memberId,
		);
		return Promise.resolve(memberRules);
	}

	try {
		const result = await db
			.select({
				id: rules.id,
				title: rules.title,
				content: rules.content,
				tool: rules.tool,
				tags: rules.tags,
				memberId: rules.memberId,
				memberName: members.name,
				memberIconUrl: members.iconUrl,
				memberCreatedAt: members.createdAt,
				memberUpdatedAt: members.updatedAt,
				ruleCreatedAt: rules.createdAt,
				ruleUpdatedAt: rules.updatedAt,
			})
			.from(rules)
			.leftJoin(members, eq(rules.memberId, members.id))
			.where(eq(rules.memberId, memberId))
			.orderBy(desc(rules.createdAt));

		// フォロー関係を取得（単一メンバーなので直接使用）
		const { followerMap, followingMap } = await fetchFollowRelations([
			memberId,
		]);

		const ruleArray: Rule[] = result.map((r) => ({
			id: r.id,
			member: {
				id: r.memberId,
				name: r.memberName || "Unknown",
				iconUrl: r.memberIconUrl || undefined,
				followerArray: followerMap.get(r.memberId) || [],
				followingArray: followingMap.get(r.memberId) || [],
				createdAt: r.memberCreatedAt?.toISOString() || new Date().toISOString(),
				updatedAt: r.memberUpdatedAt?.toISOString() || new Date().toISOString(),
			},
			title: r.title,
			contentArray: [
				{
					title: r.title,
					content: r.content,
				},
			],
			toolArray: [r.tool as Tool],
			tagArray: r.tags,
			createdAt: r.ruleCreatedAt.toISOString(),
			updatedAt: r.ruleUpdatedAt.toISOString(),
		}));

		return RuleSchema.array().parse(ruleArray);
	} catch (error) {
		console.error("Failed to fetch rules by member:", error);
		return [];
	}
};
