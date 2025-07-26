export const isDevelopment = (): boolean => {
	// MOCKED環境変数が明示的に設定されている場合はそれを優先
	if (process.env.MOCKED !== undefined) {
		return process.env.MOCKED === "true";
	}
	// それ以外は通常の開発環境判定
	return process.env.NODE_ENV === "development";
};
