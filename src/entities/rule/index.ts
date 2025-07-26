import { z } from "zod";
import { MemberSchema } from "@/entities/member";

export const TagSchema = z.string();
export type Tag = z.infer<typeof TagSchema>;

export const ToolSchema = z.enum([
	"Claude",
	"Cursor",
	"Gemini",
	"Copilot",
	"Cline",
]);
export type Tool = z.infer<typeof ToolSchema>;

export const ContentSchema = z.object({
	title: z.string(),
	content: z.string(),
});
export type Content = z.infer<typeof ContentSchema>;

export const RuleSchema = z.object({
	id: z.string(),
	member: MemberSchema,
	title: z.string(),
	contentArray: z.array(ContentSchema),
	toolArray: z.array(ToolSchema),
	tagArray: z.array(TagSchema),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
});
export type Rule = z.infer<typeof RuleSchema>;
