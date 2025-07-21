import type { User } from "@/entities/user";

export const mockUserArray: User[] = [
	{
		id: "user_01",
		name: "Taro Yamada",
		iconUrl: "https://github.com/shadcn.png",
		followerArray: [],
		followingArray: [],
	},
	{
		id: "user_02",
		name: "Hanako Sato",
		iconUrl: undefined,
		followerArray: [],
		followingArray: [],
	},
	{
		id: "user_03",
		name: "Kenji Tanaka",
		iconUrl: "https://github.com/vercel.png",
		followerArray: [],
		followingArray: [],
	},
];
