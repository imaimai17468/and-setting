import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { MemberWithEmail } from "@/entities/member";
import { UserMenu } from "../user-menu/UserMenu";

type AuthNavigationProps = {
	member: MemberWithEmail | null;
};

export const AuthNavigation = ({ member }: AuthNavigationProps) => {
	if (member) {
		return <UserMenu member={member} />;
	}

	return (
		<Button asChild size="sm" className="text-sm">
			<Link href="/login">Sign In</Link>
		</Button>
	);
};
