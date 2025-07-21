import type { User } from "@/entities/user";
import { isDevelopment } from "@/utils";
import { mockUserArray } from "./testData";

export const fetchUserById = async (
	userId: string,
): Promise<User | undefined> => {
	if (isDevelopment()) {
		const user = mockUserArray.find((u) => u.id === userId);
		return Promise.resolve(user);
	}

	// TODO: 本番環境では、実際のAPIエンドポイントからデータを取得する
	return Promise.resolve(undefined);
};
