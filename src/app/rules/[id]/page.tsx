import { notFound } from "next/navigation";
import { Content } from "@/components/features/rule-detail/content/Content";
import { Header } from "@/components/features/rule-detail/header/Header";
import { fetchRuleById } from "@/gateways/rule";

type RuleDetailPageProps = {
	params: Promise<{
		id: string;
	}>;
};

export default async function RuleDetailPage({ params }: RuleDetailPageProps) {
	const { id } = await params;
	const rule = await fetchRuleById(id);

	if (!rule) {
		notFound();
	}

	return (
		<div className="min-h-screen bg-background">
			<Header rule={rule} />
			<div className="container mx-auto px-6 py-8">
				<Content rule={rule} />
			</div>
		</div>
	);
}
