"use client";

import { BookOpen, ChevronRight } from "lucide-react";

import type { Content } from "@/entities/rule";

type RuleContentSidebarProps = {
	contentArray: Content[];
	selectedIndex: number;
	onSelect: (index: number) => void;
};

export const Sidebar = ({
	contentArray,
	selectedIndex,
	onSelect,
}: RuleContentSidebarProps) => {
	return (
		<div className="sticky top-8">
			<div className="mb-4">
				<h2 className="flex items-center space-x-2 font-semibold text-foreground text-lg">
					<BookOpen className="h-5 w-5" />
					<span>Contents</span>
				</h2>
			</div>
			<div>
				<div className="h-[600px] overflow-y-auto">
					<div className="space-y-1 p-4">
						{contentArray.map((content, index) => (
							<button
								type="button"
								key={`content-${index}`}
								className={`w-full cursor-pointer rounded-lg p-3 text-left transition-all duration-200 ${
									index === selectedIndex
										? "bg-accent text-accent-foreground"
										: "hover:bg-accent/50"
								}`}
								onClick={() => onSelect(index)}
							>
								<div className="flex items-center justify-between">
									<span
										className={`font-medium text-sm ${
											index === selectedIndex
												? "text-accent-foreground"
												: "text-foreground"
										}`}
									>
										{content.title}
									</span>
									<ChevronRight
										className={`ml-2 h-4 w-4 transition-transform ${
											index === selectedIndex
												? "rotate-90 text-accent-foreground"
												: "text-muted-foreground"
										}`}
									/>
								</div>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
