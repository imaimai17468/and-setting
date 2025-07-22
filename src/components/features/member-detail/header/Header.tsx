import { Calendar, User, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Member } from "@/entities/member";

type MemberDetailHeaderProps = {
	member: Member;
};

export const Header = ({ member }: MemberDetailHeaderProps) => {
	return (
		<div className="border-b">
			<div className="container mx-auto px-6 py-6">
				<div className="space-y-4">
					<div className="flex items-center space-x-4">
						<Avatar className="h-20 w-20">
							<AvatarImage src={member.iconUrl} alt={member.name} />
							<AvatarFallback className="bg-primary text-2xl text-primary-foreground">
								{member.name.charAt(0)}
							</AvatarFallback>
						</Avatar>
						<div>
							<h1 className="font-bold text-3xl text-foreground">
								{member.name}
							</h1>
							<p className="mt-1 text-muted-foreground">Member Profile</p>
						</div>
					</div>
					<div className="flex items-center space-x-6">
						<div className="flex items-center space-x-2">
							<Users className="h-4 w-4 text-muted-foreground" />
							<span className="text-muted-foreground text-sm">
								{member.followerArray.length} Followers
							</span>
						</div>
						<div className="flex items-center space-x-2">
							<User className="h-4 w-4 text-muted-foreground" />
							<span className="text-muted-foreground text-sm">
								{member.followingArray.length} Following
							</span>
						</div>
						<div className="flex items-center space-x-2">
							<Calendar className="h-4 w-4 text-muted-foreground" />
							<span className="text-muted-foreground text-sm">
								Joined 2 months ago
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
