import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Member } from "@/entities/member";

type MemberCardProps = {
	member: Member;
};

export const MemberCard = ({ member }: MemberCardProps) => {
	return (
		<Link href={`/members/${member.id}`} className="block h-full">
			<Card className="h-full transition-colors hover:border-gray-500">
				<CardHeader className="pb-0">
					<div className="flex flex-col items-center text-center">
						<Avatar className="mb-3 h-16 w-16">
							<AvatarImage src={member.iconUrl} alt={member.name} />
							<AvatarFallback className="text-lg">
								{member.name.charAt(0)}
							</AvatarFallback>
						</Avatar>
						<CardTitle className="font-medium text-sm">{member.name}</CardTitle>
					</div>
				</CardHeader>
				<CardContent className="pt-0">
					<div className="space-y-3 text-center">
						<div className="flex justify-center gap-4 text-muted-foreground text-xs">
							<div>
								<span className="font-medium">
									{member.followerArray.length}
								</span>
								<span className="ml-1">フォロワー</span>
							</div>
							<div>
								<span className="font-medium">
									{member.followingArray.length}
								</span>
								<span className="ml-1">フォロー中</span>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};
