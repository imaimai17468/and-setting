import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const LoadingSkeleton = () => {
	const count = 8;
	return (
		<div className="grid grid-cols-4 gap-4">
			{Array.from({ length: count }, (_, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: スケルトンローダーは静的なので問題なし
				<Card key={`skeleton-${index}`} className="h-full animate-pulse">
					<CardHeader className="pb-0">
						<div className="mb-2 h-4 rounded bg-muted" />
						<div className="mb-3 h-3 w-3/4 rounded bg-muted" />
						<div className="flex items-center gap-2">
							<div className="h-6 w-6 rounded-full bg-muted" />
							<div className="h-3 w-16 rounded bg-muted" />
						</div>
					</CardHeader>
					<CardContent className="pt-0">
						<div className="space-y-3">
							<div className="rounded-md border bg-muted/30 p-3">
								<div className="space-y-2">
									<div className="h-3 rounded bg-muted" />
									<div className="h-3 w-4/5 rounded bg-muted" />
									<div className="h-3 w-3/5 rounded bg-muted" />
								</div>
							</div>
							<div className="flex flex-wrap gap-1">
								<div className="h-5 w-12 rounded bg-muted" />
								<div className="h-5 w-16 rounded bg-muted" />
							</div>
							<div className="flex flex-wrap gap-1">
								<div className="h-5 w-14 rounded bg-muted" />
								<div className="h-5 w-10 rounded bg-muted" />
								<div className="h-5 w-18 rounded bg-muted" />
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
};
