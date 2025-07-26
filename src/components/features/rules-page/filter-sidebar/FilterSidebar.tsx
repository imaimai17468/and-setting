"use client";

import { Checkbox } from "@/components/ui/checkbox";
import type { Rule, Tag, Tool } from "@/entities/rule";
import type { FilterState } from "../filterUtils";
import {
	getAllTools,
	getTagCount,
	getToolCount,
	getTopTags,
} from "./presenter";

type FilterSidebarProps = {
	rules: Rule[];
	filters: FilterState;
	onToggleTool: (tool: Tool) => void;
	onToggleTag: (tag: Tag) => void;
};

export const FilterSidebar = ({
	rules,
	filters,
	onToggleTool,
	onToggleTag,
}: FilterSidebarProps) => {
	const tools = getAllTools();
	const topTags = getTopTags(rules);

	return (
		<div className="space-y-8">
			<div>
				<h3 className="mb-4 font-semibold text-muted-foreground text-sm uppercase tracking-wider">
					Tools
				</h3>
				<div className="space-y-3">
					{tools.map((tool) => {
						const count = getToolCount(rules, tool);
						return (
							<label
								key={tool}
								htmlFor={`tool-${tool}`}
								className="flex cursor-pointer items-center space-x-2"
							>
								<Checkbox
									id={`tool-${tool}`}
									checked={filters.selectedTools.includes(tool)}
									onCheckedChange={() => onToggleTool(tool)}
								/>
								<span className="flex-1 text-sm">{tool}</span>
								<span className="text-muted-foreground text-xs">{count}</span>
							</label>
						);
					})}
				</div>
			</div>

			<div>
				<h3 className="mb-4 font-semibold text-muted-foreground text-sm uppercase tracking-wider">
					Popular Tags
				</h3>
				<div className="space-y-3">
					{topTags.map((tag) => {
						const count = getTagCount(rules, tag);
						return (
							<label
								key={tag}
								htmlFor={`tag-${tag}`}
								className="flex cursor-pointer items-center space-x-2"
							>
								<Checkbox
									id={`tag-${tag}`}
									checked={filters.selectedTags.includes(tag)}
									onCheckedChange={() => onToggleTag(tag)}
								/>
								<span className="flex-1 text-sm">{tag}</span>
								<span className="text-muted-foreground text-xs">{count}</span>
							</label>
						);
					})}
				</div>
			</div>
		</div>
	);
};
