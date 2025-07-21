import { fetchRuleArray } from "@/gateways/rule";
import { List } from "./list/List";

export const RuleCardList = async () => {
	const ruleArray = await fetchRuleArray();

	return (
		<div className="animate-fade-in">
			<List ruleArray={ruleArray} />
		</div>
	);
};
