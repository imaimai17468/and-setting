import type { Rule } from "@/entities/rule";
import { isDevelopment } from "@/utils";
import { mockRuleArray } from "./testData";

export const fetchRuleArray = async (): Promise<Rule[]> => {
	if (isDevelopment()) {
		return Promise.resolve(mockRuleArray);
	}

	// TODO: 本番環境では、実際のAPIエンドポイントからデータを取得する
	return Promise.resolve([]);
};
