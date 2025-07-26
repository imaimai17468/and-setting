import type { Rule, Tag, Tool } from "@/entities/rule";

export type FilterState = {
	selectedTools: Tool[];
	selectedTags: Tag[];
};

export const filterRules = (rules: Rule[], filters: FilterState): Rule[] => {
	return rules.filter((rule) => {
		// ツールフィルター: 選択されたツールのいずれかを含むルール
		const matchesTools =
			filters.selectedTools.length === 0 ||
			filters.selectedTools.some((tool) => rule.toolArray.includes(tool));

		// タグフィルター: 選択されたタグのいずれかを含むルール
		const matchesTags =
			filters.selectedTags.length === 0 ||
			filters.selectedTags.some((tag) => rule.tagArray.includes(tag));

		return matchesTools && matchesTags;
	});
};

export const getUniqueTools = (rules: Rule[]): Tool[] => {
	const toolSet = new Set<Tool>();
	for (const rule of rules) {
		for (const tool of rule.toolArray) {
			toolSet.add(tool);
		}
	}
	return Array.from(toolSet);
};

export const getTagsWithCount = (
	rules: Rule[],
): Array<{ tag: Tag; count: number }> => {
	const tagCountMap = new Map<Tag, number>();

	for (const rule of rules) {
		for (const tag of rule.tagArray) {
			tagCountMap.set(tag, (tagCountMap.get(tag) || 0) + 1);
		}
	}

	return Array.from(tagCountMap.entries())
		.map(([tag, count]) => ({ tag, count }))
		.sort((a, b) => b.count - a.count);
};
