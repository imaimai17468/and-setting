"use client";

import { Code2 } from "lucide-react";
import type { Content } from "@/entities/rule";

type RuleContentViewerProps = {
	content: Content;
};

export const Viewer = ({ content }: RuleContentViewerProps) => {
	return (
		<div>
			<div className="mb-6">
				<h2 className="flex items-center space-x-3 font-bold text-2xl text-foreground">
					<div className="rounded-lg bg-primary p-2">
						<Code2 className="h-5 w-5 text-primary-foreground" />
					</div>
					<span>{content.title}</span>
				</h2>
			</div>
			<div className="prose prose-invert prose-slate max-w-none">
				<div className="whitespace-pre-wrap rounded-lg bg-muted p-6 font-mono text-foreground text-sm leading-relaxed">
					{content.content}
				</div>
			</div>
		</div>
	);
};
