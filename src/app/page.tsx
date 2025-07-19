import Image from "next/image";

export default function Home() {
	return (
		<div>
			<div className="space-y-2">
				<Image
					src="/app-icon.png"
					alt="logo"
					width={150}
					height={150}
					className="mx-auto opacity-50"
				/>
				<h1 className="text-center font-bold text-4xl">
					Code less. Decide more.
				</h1>
				<div className="animate-fade-in text-center">
					<p className="max-w-xl text-gray-400 text-sm">
						The platform for those who write the rules behind the AI.
					</p>
					<p className="max-w-xl text-gray-400 text-sm">
						Share project-ready rule templates for Claude, Cursor, and more
					</p>
				</div>
			</div>
		</div>
	);
}
