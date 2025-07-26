import type { Member } from "@/entities/member";
import { MemberGrid } from "./member-grid/MemberGrid";

type MemberListPageProps = {
	members: Member[];
};

export const MemberListPage = ({ members }: MemberListPageProps) => {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="font-bold text-3xl text-foreground">メンバー</h1>
				<p className="mt-2 text-muted-foreground">
					{members.length}人のメンバー
				</p>
			</div>

			<MemberGrid members={members} />
		</div>
	);
};
