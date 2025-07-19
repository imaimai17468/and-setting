import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Header = () => {
	return (
		<header className="fixed top-0 right-0 left-0 z-50">
			<div className="flex items-center justify-between px-6 py-6">
				<div>
					<h1 className="font-medium text-2xl">&[📝]s!</h1>
					<p className="text-gray-400 text-xs">- and Rules!</p>
				</div>
				<div className="flex items-center gap-5">
					<Link href="/members" className="text-gray-400 text-sm">
						Members
					</Link>
					<Link href="/rules" className="text-gray-400 text-sm">
						Rules
					</Link>
					<Button
						size="sm"
						variant="ghost"
						className="cursor-pointer text-gray-400 text-sm has-[>svg]:px-0 dark:hover:bg-transparent"
					>
						More <ChevronDown className="h-4 w-4" />
					</Button>
					<Button size="sm" className="text-sm">
						Sign In
					</Button>
				</div>
			</div>
		</header>
	);
};
