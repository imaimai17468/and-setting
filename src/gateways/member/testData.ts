import type { Member } from "@/entities/member";

const now = new Date();
const past = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // 30日前

export const mockMemberArray: Member[] = [
	{
		id: "member_01",
		name: "Taro Yamada",
		iconUrl: "https://github.com/shadcn.png",
		followerArray: [],
		followingArray: [],
		createdAt: past.toISOString(),
		updatedAt: now.toISOString(),
	},
	{
		id: "member_02",
		name: "Hanako Sato",
		iconUrl: undefined,
		followerArray: [],
		followingArray: [],
		createdAt: past.toISOString(),
		updatedAt: past.toISOString(),
	},
	{
		id: "member_03",
		name: "Kenji Tanaka",
		iconUrl: "https://github.com/vercel.png",
		followerArray: [],
		followingArray: [],
		createdAt: now.toISOString(),
		updatedAt: now.toISOString(),
	},
];
