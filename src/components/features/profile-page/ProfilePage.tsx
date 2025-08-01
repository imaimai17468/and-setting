import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { MemberWithEmail } from "@/entities/member";
import { ProfileForm } from "./profile-form/ProfileForm";

type ProfilePageProps = {
	member: MemberWithEmail;
};

export const ProfilePage = ({ member }: ProfilePageProps) => {
	return (
		<div className="container mx-auto flex h-screen max-w-2xl flex-col items-center justify-center">
			<h1 className="mb-8 text-3xl">Profile</h1>

			<div className="space-y-6">
				<Card>
					<CardHeader>
						<CardTitle>Basic Information</CardTitle>
						<CardDescription>
							You can set your profile image and name
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ProfileForm member={member} />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Account Information</CardTitle>
						<CardDescription>Basic account information</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<p className="text-muted-foreground text-sm">Email Address</p>
							<p className="font-medium">{member.email}</p>
						</div>
						<div>
							<p className="text-muted-foreground text-sm">Registration Date</p>
							<p className="font-medium">
								{new Date(member.createdAt).toLocaleDateString("ja-JP")}
							</p>
						</div>
						<div>
							<p className="text-muted-foreground text-sm">Last Updated</p>
							<p className="font-medium">
								{new Date(member.updatedAt).toLocaleDateString("ja-JP")}
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
