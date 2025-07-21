import type { Member } from "@/entities/member";
import { isDevelopment } from "@/utils";
import { mockMemberArray } from "./testData";

export const fetchMemberById = async (
	memberId: string,
): Promise<Member | undefined> => {
	if (isDevelopment()) {
		const member = mockMemberArray.find((m) => m.id === memberId);
		return Promise.resolve(member);
	}

	// TODO: 本番環境では、実際のAPIエンドポイントからデータを取得する
	return Promise.resolve(undefined);
};
