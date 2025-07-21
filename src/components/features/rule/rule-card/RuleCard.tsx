import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Rule } from "@/entities/rule";

type RuleCardProps = {
	rule: Rule;
};

export const RuleCard = ({ rule }: RuleCardProps) => {
	return (
		<Link href={`/rules/${rule.id}`} className="block h-full">
			<Card className="h-full transition-colors hover:border-gray-500">
				<CardHeader className="pb-0">
					<CardTitle className="line-clamp-2 font-medium text-sm">
						{rule.title}
					</CardTitle>
					<div className="mt-2 flex items-center gap-2">
						<Avatar className="h-6 w-6">
							<AvatarImage src={rule.member.iconUrl} alt={rule.member.name} />
							<AvatarFallback className="text-xs">
								{rule.member.name.charAt(0)}
							</AvatarFallback>
						</Avatar>
						<span className="text-muted-foreground text-xs">
							{rule.member.name}
						</span>
					</div>
				</CardHeader>
				<CardContent className="pt-0">
					<div className="space-y-3">
						{rule.contentArray.length > 0 && (
							<div className="rounded-md border bg-muted/30 p-3">
								<p className="line-clamp-3 text-muted-foreground text-xs">
									{rule.contentArray[0].content}
								</p>
							</div>
						)}
						<div className="flex flex-wrap gap-1">
							{rule.toolArray.map((tool) => (
								<Badge key={tool} variant="secondary" className="text-xs">
									{tool}
								</Badge>
							))}
						</div>
						<div className="flex flex-wrap gap-1">
							{rule.tagArray.map((tag) => (
								<Badge key={tag} variant="outline" className="text-xs">
									{tag}
								</Badge>
							))}
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};
