"use client";

import type { Rule } from "@/entities/rule";
import { FilterSidebar } from "./filter-sidebar/FilterSidebar";
import { RuleGrid } from "./rule-grid/RuleGrid";
import { useRulesFilter } from "./useRulesFilter";

type RulesPageProps = {
	rules: Rule[];
};

export const RulesPage = ({ rules }: RulesPageProps) => {
	const { filters, toggleTool, toggleTag, filteredRules } =
		useRulesFilter(rules);

	return (
		<div className="container mx-auto px-6 py-8">
			<h1 className="mb-8 font-bold text-3xl">All Rules</h1>
			<div className="flex gap-8">
				<aside className="w-64 flex-shrink-0">
					<FilterSidebar
						rules={rules}
						filters={filters}
						onToggleTool={toggleTool}
						onToggleTag={toggleTag}
					/>
				</aside>
				<main className="flex-1">
					<RuleGrid rules={filteredRules} />
				</main>
			</div>
		</div>
	);
};
