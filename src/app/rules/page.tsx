import { RulesPage } from "@/components/features/rules-page/RulesPage";
import { fetchRuleArray } from "@/gateways/rule";

export default async function RulesListPage() {
	const rules = await fetchRuleArray();

	return <RulesPage rules={rules} />;
}
