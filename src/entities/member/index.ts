import { z } from "zod";

export const MemberSchema = z.object({
	id: z.string(),
	name: z.string(),
	iconUrl: z.url().optional(),
	followerArray: z.array(z.string()),
	followingArray: z.array(z.string()),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
});

export type Member = z.infer<typeof MemberSchema>;

export const MemberWithEmailSchema = MemberSchema.extend({
	email: z.string().email(),
});

export type MemberWithEmail = z.infer<typeof MemberWithEmailSchema>;

export const UpdateMemberSchema = z.object({
	name: z
		.string()
		.min(1, "Name is required")
		.max(50, "Name must be 50 characters or less"),
});

export type UpdateMember = z.infer<typeof UpdateMemberSchema>;

export const UpdateAvatarSchema = z.object({
	iconUrl: z.string().url(),
});

export type UpdateAvatar = z.infer<typeof UpdateAvatarSchema>;
