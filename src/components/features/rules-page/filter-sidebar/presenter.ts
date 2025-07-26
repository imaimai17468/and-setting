import type { Rule, Tag, Tool } from "@/entities/rule";
import { getTagsWithCount } from "../filterUtils";

export const getAllTools = (): Tool[] => {
	return ["Claude", "Cursor", "Gemini", "Copilot", "Cline"];
};

export const getToolCount = (rules: Rule[], tool: Tool): number => {
	return rules.filter((rule) => rule.toolArray.includes(tool)).length;
};

export const getTopTags = (rules: Rule[], limit = 10): Tag[] => {
	return getTagsWithCount(rules)
		.slice(0, limit)
		.map((item) => item.tag);
};

export const getTagCount = (rules: Rule[], tag: Tag): number => {
	return rules.filter((rule) => rule.tagArray.includes(tag)).length;
};
