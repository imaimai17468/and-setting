import type { Member } from "@/entities/member";
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

	// TODO: 本番環境では、実際のAPIエンドポイントからデータを取得する
	return Promise.resolve(null);
};

export const fetchMemberArray = async (): Promise<Member[]> => {
	if (isDevelopment()) {
		// 開発環境でローディング状態を確認するため1秒遅延
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return Promise.resolve(mockMemberArray);
	}

	// TODO: 本番環境では、実際のAPIエンドポイントからデータを取得する
	return Promise.resolve([]);
};
