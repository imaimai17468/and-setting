import Image from "next/image";
import { Suspense } from "react";
import { RuleCardList } from "@/components/features/rule/rule-card-list/RuleCardList";

export default function Home() {
	return (
		<div className="space-y-16">
			<div className="flex flex-col items-center justify-center">
				<Image
					src="/app-icon.png"
					alt="logo"
					width={150}
					height={150}
					className="mx-auto opacity-50"
				/>
				<h1 className="text-center font-bold text-4xl">
					Write rules, not code.
				</h1>
				<div className="animate-fade-in text-center">
					<p className="max-w-xl text-gray-400 text-sm">
						The platform for those who write the rules behind the AI.
					</p>
					<p className="max-w-xl text-gray-400 text-sm">
						Share project-ready rule templates for Claude, Cursor, and more.
					</p>
				</div>
			</div>
			<div className="space-y-4">
				<h2 className="font-semibold text-2xl">Featured Rules</h2>
				<Suspense
					fallback={
						<div className="text-center text-muted-foreground">
							ルールを読み込み中...
						</div>
					}
				>
					<RuleCardList />
				</Suspense>
			</div>
			<div>
				<h2 className="font-semibold text-2xl">Featured Members</h2>
			</div>
		</div>
	);
}
