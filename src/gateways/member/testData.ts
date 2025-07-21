import type { Member } from "@/entities/member";

export const mockMemberArray: Member[] = [
	{
		id: "member_01",
		name: "Taro Yamada",
		iconUrl: "https://github.com/shadcn.png",
		followerArray: [],
		followingArray: [],
	},
	{
		id: "member_02",
		name: "Hanako Sato",
		iconUrl: undefined,
		followerArray: [],
		followingArray: [],
	},
	{
		id: "member_03",
		name: "Kenji Tanaka",
		iconUrl: "https://github.com/vercel.png",
		followerArray: [],
		followingArray: [],
	},
];
