import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const AddRuleCard = () => {
	return (
		<Button variant="ghost" className="h-full w-full p-0 hover:bg-transparent">
			<Card className="h-full w-full border-2 border-muted-foreground/25 border-dashed transition-colors hover:border-muted-foreground/50">
				<CardContent className="flex h-full flex-col items-center justify-center p-6">
					<div className="flex flex-col items-center gap-3 text-center">
						<div className="rounded-full border-2 border-muted-foreground/25 border-dashed p-4">
							<Plus className="h-6 w-6 text-muted-foreground" />
						</div>
						<div className="space-y-1">
							<p className="font-medium text-muted-foreground text-sm">
								ルールを追加しませんか？
							</p>
							<p className="text-muted-foreground/75 text-xs">
								新しいルールを作成して共有しましょう
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</Button>
	);
};
