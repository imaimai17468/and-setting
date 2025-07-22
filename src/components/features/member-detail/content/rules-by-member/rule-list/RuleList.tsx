import { RuleCard } from "@/components/features/rule/rule-card/RuleCard";
import type { Rule } from "@/entities/rule";

type RuleListProps = {
	ruleArray: Rule[];
};

export const RuleList = ({ ruleArray }: RuleListProps) => {
	if (ruleArray.length === 0) {
		return (
			<div className="py-12 text-center">
				<p className="text-muted-foreground">No rules found for this member.</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
			{ruleArray.map((rule) => (
				<RuleCard key={rule.id} rule={rule} />
			))}
		</div>
	);
};
