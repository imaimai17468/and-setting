import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Rule } from "@/entities/rule";

type RuleCardProps = {
	rule: Rule;
};

export const RuleCard = ({ rule }: RuleCardProps) => {
	const firstContent = rule.contentArray[0]?.content;

	return (
		<Card className="w-full max-w-2xl">
			<CardHeader>
				<div className="mb-4 flex items-center gap-3">
					<Avatar>
						<AvatarImage src={rule.user.iconUrl} alt={rule.user.name} />
						<AvatarFallback>
							{rule.user.name.slice(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<span className="font-medium text-muted-foreground">
						{rule.user.name}
					</span>
				</div>
				<CardTitle>{rule.title}</CardTitle>
			</CardHeader>
			{firstContent && (
				<CardContent>
					<div className="rounded-md bg-muted p-4">
						<p className="line-clamp-3 whitespace-pre-wrap text-muted-foreground text-sm">
							{firstContent}
						</p>
					</div>
				</CardContent>
			)}
			<CardFooter className="flex flex-wrap gap-2">
				{rule.toolArray.map((tool) => (
					<Badge key={tool} variant="default">
						{tool}
					</Badge>
				))}
				{rule.tagArray.map((tag) => (
					<Badge key={tag} variant="secondary">
						#{tag}
					</Badge>
				))}
			</CardFooter>
		</Card>
	);
};
