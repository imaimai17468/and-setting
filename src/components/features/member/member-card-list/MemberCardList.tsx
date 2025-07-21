import { fetchMemberArray } from "@/gateways/member";
import { List } from "./list/List";

export const MemberCardList = async () => {
	const memberArray = await fetchMemberArray();

	return (
		<div className="animate-fade-in">
			<List memberArray={memberArray} />
		</div>
	);
};
