"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { signInWithGithub, signInWithGoogle } from "@/lib/auth";

export default function Home() {
	return (
		<div className="flex h-full flex-col items-center justify-center gap-8">
			<div className="space-y-2 text-center">
				<p className="text-muted-foreground">
					Share AI tool settings to maximize development efficiency
				</p>
			</div>
			<div className="flex flex-col gap-4">
				<Button
					type="button"
					variant="outline"
					className="cursor-pointer"
					onClick={signInWithGithub}
				>
					<Image
						src="/github-mark-white.svg"
						alt="Github"
						width={20}
						height={20}
					/>
					Sign in With Github
				</Button>
				<Button
					type="button"
					variant="outline"
					className="cursor-pointer"
					onClick={signInWithGoogle}
				>
					<Image src="/google-icon.svg" alt="Google" width={20} height={20} />
					Sign in With Google
				</Button>
			</div>
		</div>
	);
}
