"use client";

import { LogOut, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { MemberWithEmail } from "@/entities/member";
import { signOut } from "@/lib/auth";

type UserMenuProps = {
	member: MemberWithEmail;
};

export const UserMenu = ({ member }: UserMenuProps) => {
	const iconUrl = member.iconUrl;
	const name = member.name || "User";
	const email = member.email;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					className="cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
				>
					<Avatar className="h-8 w-8">
						<AvatarImage src={iconUrl || undefined} alt={name} />
						<AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
					</Avatar>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56" sideOffset={16}>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="font-medium text-sm leading-none">{name}</p>
						{email && (
							<p className="text-muted-foreground text-xs leading-none">
								{email}
							</p>
						)}
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href="/profile" className="cursor-pointer">
						<UserIcon className="mr-2 h-4 w-4" />
						<span>Profile</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="cursor-pointer text-destructive focus:text-destructive"
					onClick={async () => {
						try {
							await signOut();
							// ログインページにリダイレクト
							window.location.href = "/login";
						} catch (error) {
							console.error("Failed to sign out:", error);
							// エラーが発生してもログインページにリダイレクト
							window.location.href = "/login";
						}
					}}
				>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
