import { Users } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import type { Member } from "@/entities/member";

type MemberGridProps = {
	members: Member[];
};

export const MemberGrid = ({ members }: MemberGridProps) => {
	return (
		<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{members.map((member) => (
				<Link key={member.id} href={`/members/${member.id}`}>
					<Card className="transition-all hover:shadow-lg">
						<CardContent className="p-6">
							<div className="flex flex-col items-center space-y-4 text-center">
								<Avatar className="h-20 w-20">
									<AvatarImage src={member.iconUrl} alt={member.name} />
									<AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
								</Avatar>
								<div className="space-y-1">
									<h3 className="font-semibold text-lg">{member.name}</h3>
									<div className="flex items-center justify-center space-x-4 text-muted-foreground text-sm">
										<div className="flex items-center space-x-1">
											<Users className="h-4 w-4" />
											<span>{member.followerArray.length} フォロワー</span>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</Link>
			))}
		</div>
	);
};
