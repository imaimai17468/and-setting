import { MemberCard } from "@/components/features/member/member-card/MemberCard";
import type { Member } from "@/entities/member";

const MAX_DISPLAY_COUNT = 8; // 4列 × 2行

type ListProps = {
	memberArray: Member[];
};

export const List = ({ memberArray }: ListProps) => {
	const displayMembers = memberArray.slice(0, MAX_DISPLAY_COUNT);

	return (
		<div className="grid grid-cols-4 gap-4">
			{displayMembers.map((member) => (
				<MemberCard key={member.id} member={member} />
			))}
		</div>
	);
};
