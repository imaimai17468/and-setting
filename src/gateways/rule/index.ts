import type { Rule } from "@/entities/rule";
import { isDevelopment } from "@/utils";
import { mockRuleArray } from "./testData";

export const fetchRuleArray = async (): Promise<Rule[]> => {
	if (isDevelopment()) {
		// 開発環境でローディング状態を確認するため500ms遅延
		await new Promise((resolve) => setTimeout(resolve, 500));
		return Promise.resolve(mockRuleArray);
	}

	// TODO: 本番環境では、実際のAPIエンドポイントからデータを取得する
	return Promise.resolve([]);
};

export const fetchRuleById = async (ruleId: string): Promise<Rule | null> => {
	if (isDevelopment()) {
		// 開発環境でローディング状態を確認するため500ms遅延
		await new Promise((resolve) => setTimeout(resolve, 500));
		const rule = mockRuleArray.find((r) => r.id === ruleId);
		return Promise.resolve(rule || null);
	}

	// TODO: 本番環境では、実際のAPIエンドポイントからデータを取得する
	return Promise.resolve(null);
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

	// TODO: 本番環境では、実際のAPIエンドポイントからデータを取得する
	return Promise.resolve([]);
};
