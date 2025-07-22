import { BookOpen, Calendar, Code2, TagIcon, Wrench } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Rule } from "@/entities/rule";

type RuleDetailHeaderProps = {
	rule: Rule;
};

export const Header = ({ rule }: RuleDetailHeaderProps) => {
	return (
		<div className="border-b">
			<div className="container mx-auto px-6 py-6">
				<div className="space-y-4">
					<div className="flex items-center space-x-3">
						<div className="rounded-lg bg-primary p-2">
							<BookOpen className="h-6 w-6 text-primary-foreground" />
						</div>
						<div>
							<h1 className="font-bold text-3xl text-foreground">
								{rule.title}
							</h1>
						</div>
					</div>
					<div className="flex items-center space-x-6">
						<Link
							href={`/members/${rule.member.id}`}
							className="flex items-center space-x-2 transition-opacity hover:opacity-80"
						>
							<Avatar className="h-8 w-8">
								<AvatarImage src={rule.member.iconUrl} alt={rule.member.name} />
								<AvatarFallback className="bg-primary text-primary-foreground">
									{rule.member.name.charAt(0)}
								</AvatarFallback>
							</Avatar>
							<span className="text-foreground">{rule.member.name}</span>
						</Link>
						<div className="flex items-center space-x-2">
							<Calendar className="h-4 w-4 text-muted-foreground" />
							<span className="text-muted-foreground">Updated 2 days ago</span>
						</div>
					</div>
				</div>

				{/* Tools and Tags */}
				<div className="mt-6 space-y-3">
					<div className="flex items-center space-x-3">
						<Wrench className="h-4 w-4 text-muted-foreground" />
						<span className="text-muted-foreground text-sm">Tools:</span>
						<div className="flex space-x-2">
							{rule.toolArray.map((tool) => (
								<Badge key={tool} variant="secondary">
									<Code2 className="mr-1 h-3 w-3" />
									{tool}
								</Badge>
							))}
						</div>
					</div>
					<div className="flex items-center space-x-3">
						<TagIcon className="h-4 w-4 text-muted-foreground" />
						<span className="text-muted-foreground text-sm">Tags:</span>
						<div className="flex flex-wrap gap-2">
							{rule.tagArray.map((tag) => (
								<Badge key={tag} variant="outline">
									{tag}
								</Badge>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
