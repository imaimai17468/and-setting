import { redirect } from "next/navigation";
import { ProfilePage } from "@/components/features/profile-page/ProfilePage";
import { fetchCurrentMember } from "@/gateways/member";

export default async function Profile() {
	const member = await fetchCurrentMember();

	if (!member) {
		redirect("/login");
	}

	return <ProfilePage member={member} />;
}
