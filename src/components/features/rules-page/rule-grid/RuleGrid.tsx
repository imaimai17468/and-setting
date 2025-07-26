import { RuleCard } from "@/components/features/rule/rule-card/RuleCard";
import type { Rule } from "@/entities/rule";

type RuleGridProps = {
	rules: Rule[];
};

export const RuleGrid = ({ rules }: RuleGridProps) => {
	if (rules.length === 0) {
		return (
			<div className="flex h-64 items-center justify-center text-muted-foreground">
				<p>No rules found matching the selected filters.</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{rules.map((rule) => (
				<RuleCard key={rule.id} rule={rule} />
			))}
		</div>
	);
};
