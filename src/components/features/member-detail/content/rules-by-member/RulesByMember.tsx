import { fetchRulesByMemberId } from "@/gateways/rule";
import { RuleList } from "./rule-list/RuleList";

type RulesByMemberProps = {
	memberId: string;
};

export const RulesByMember = async ({ memberId }: RulesByMemberProps) => {
	const rules = await fetchRulesByMemberId(memberId);

	return <RuleList ruleArray={rules} />;
};
