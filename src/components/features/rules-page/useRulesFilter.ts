import { useMemo, useState } from "react";
import type { Rule, Tag, Tool } from "@/entities/rule";
import { type FilterState, filterRules } from "./filterUtils";

export const useRulesFilter = (rules: Rule[]) => {
	const [filters, setFilters] = useState<FilterState>({
		selectedTools: [],
		selectedTags: [],
	});

	const toggleTool = (tool: Tool) => {
		setFilters((prev) => ({
			...prev,
			selectedTools: prev.selectedTools.includes(tool)
				? prev.selectedTools.filter((t) => t !== tool)
				: [...prev.selectedTools, tool],
		}));
	};

	const toggleTag = (tag: Tag) => {
		setFilters((prev) => ({
			...prev,
			selectedTags: prev.selectedTags.includes(tag)
				? prev.selectedTags.filter((t) => t !== tag)
				: [...prev.selectedTags, tag],
		}));
	};

	const filteredRules = useMemo(
		() => filterRules(rules, filters),
		[rules, filters],
	);

	return {
		filters,
		toggleTool,
		toggleTag,
		filteredRules,
	};
};
