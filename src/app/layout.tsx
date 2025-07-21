import type { Metadata } from "next";
import "./globals.css";
import { Geist_Mono } from "next/font/google";
import { Header } from "@/components/shared/header/Header";

const geistMono = Geist_Mono({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title:
		"&[📝]s! - and Rules! | The platform for those who write the rules behind the AI.",
	description: "The platform for those who write the rules behind the AI.",
	icons: {
		icon: "/app-icon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`dark antialiased ${geistMono.className}`}>
				<Header />
				<div className="my-[10%] flex min-h-screen w-full justify-center px-6 md:px-0">
					<div className="w-full max-w-7xl">{children}</div>
				</div>
			</body>
		</html>
	);
}
