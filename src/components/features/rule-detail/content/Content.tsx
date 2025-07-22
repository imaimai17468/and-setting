"use client";

import { useState } from "react";
import type { Rule } from "@/entities/rule";
import { Sidebar } from "./sidebar/Sidebar";
import { Viewer } from "./viewer/Viewer";

type RuleDetailContentProps = {
	rule: Rule;
};

export const Content = ({ rule }: RuleDetailContentProps) => {
	const [selectedContentIndex, setSelectedContentIndex] = useState(0);

	// コンテンツが存在しない場合の処理
	if (!rule.contentArray || rule.contentArray.length === 0) {
		return (
			<div className="py-12 text-center">
				<p className="text-muted-foreground">
					No content available for this rule.
				</p>
			</div>
		);
	}

	const selectedContent = rule.contentArray[selectedContentIndex];

	return (
		<div className="grid grid-cols-12 gap-8">
			{/* Sidebar */}
			<div className="col-span-3">
				<Sidebar
					contentArray={rule.contentArray}
					selectedIndex={selectedContentIndex}
					onSelect={setSelectedContentIndex}
				/>
			</div>

			{/* Content Area */}
			<div className="col-span-9">
				<Viewer content={selectedContent} />
			</div>
		</div>
	);
};
