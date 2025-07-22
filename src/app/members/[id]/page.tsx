import { notFound } from "next/navigation";
import { Content } from "@/components/features/member-detail/content/Content";
import { Header } from "@/components/features/member-detail/header/Header";
import { fetchMemberById } from "@/gateways/member";

type MemberDetailPageProps = {
	params: {
		id: string;
	};
};

export default async function MemberDetailPage({
	params,
}: MemberDetailPageProps) {
	const member = await fetchMemberById(params.id);

	if (!member) {
		notFound();
	}

	return (
		<div className="min-h-screen bg-background">
			<Header member={member} />
			<div className="container mx-auto px-6 py-8">
				<Content member={member} />
			</div>
		</div>
	);
}
