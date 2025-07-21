import { fetchRuleArray } from "@/gateways/rule";
import { List } from "./list/List";

export const RuleCardList = async () => {
	const ruleArray = await fetchRuleArray();

	return <List ruleArray={ruleArray} />;
};
