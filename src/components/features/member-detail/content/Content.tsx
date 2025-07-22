import { Suspense } from "react";
import { LoadingSkeleton } from "@/components/features/rule/loading-skeleton/LoadingSkeleton";
import type { Member } from "@/entities/member";
import { RulesByMember } from "./rules-by-member/RulesByMember";

type MemberDetailContentProps = {
	member: Member;
};

export const Content = ({ member }: MemberDetailContentProps) => {
	return (
		<div className="space-y-8">
			<div>
				<h2 className="mb-4 font-semibold text-2xl text-foreground">
					Rules by {member.name}
				</h2>
				<Suspense fallback={<LoadingSkeleton />}>
					<RulesByMember memberId={member.id} />
				</Suspense>
			</div>
		</div>
	);
};
