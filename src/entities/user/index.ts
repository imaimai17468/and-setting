import { z } from "zod";

export const UserSchema = z.object({
	id: z.string(),
	name: z.string(),
	iconUrl: z.url().optional(),
	followerArray: z.array(z.string()),
	followingArray: z.array(z.string()),
});

export type User = z.infer<typeof UserSchema>;
