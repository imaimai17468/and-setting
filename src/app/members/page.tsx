import { MemberListPage } from "@/components/features/member-list-page/MemberListPage";
import { fetchMemberArray } from "@/gateways/member";

export default async function MembersPage() {
	const members = await fetchMemberArray();

	return <MemberListPage members={members} />;
}
