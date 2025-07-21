import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const LoadingSkeleton = () => {
	const skeletonItems = Array.from({ length: 8 }, (_, index) => ({
		id: `skeleton-${index}`,
	}));

	return (
		<div className="grid grid-cols-4 gap-4">
			{skeletonItems.map((item) => (
				<Card key={item.id} className="h-full animate-pulse">
					<CardHeader className="pb-0">
						<div className="flex flex-col items-center text-center">
							<div className="mb-3 h-16 w-16 rounded-full bg-muted" />
							<div className="h-4 w-20 rounded bg-muted" />
						</div>
					</CardHeader>
					<CardContent className="pt-0">
						<div className="space-y-3 text-center">
							<div className="flex justify-center gap-4">
								<div className="space-y-1">
									<div className="h-3 w-8 rounded bg-muted" />
									<div className="h-3 w-12 rounded bg-muted" />
								</div>
								<div className="space-y-1">
									<div className="h-3 w-8 rounded bg-muted" />
									<div className="h-3 w-12 rounded bg-muted" />
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
};
