import { AddRuleCard } from "@/components/features/rule/add-rule-card/AddRuleCard";
import { RuleCard } from "@/components/features/rule/rule-card/RuleCard";
import type { Rule } from "@/entities/rule";

const MAX_DISPLAY_COUNT = 12; // 4列 × 3行

type ListProps = {
	ruleArray: Rule[];
};

export const List = ({ ruleArray }: ListProps) => {
	const displayRules = ruleArray.slice(0, MAX_DISPLAY_COUNT - 1); // 追加カード用に1つ分空ける
	const shouldShowAddCard = displayRules.length < MAX_DISPLAY_COUNT - 1;

	return (
		<div className="grid grid-cols-4 gap-4">
			{displayRules.map((rule) => (
				<RuleCard key={rule.id} rule={rule} />
			))}
			{shouldShowAddCard && <AddRuleCard />}
		</div>
	);
};
