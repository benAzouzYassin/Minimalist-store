import type { Metadata } from "next";
import "./globals.css";
import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Poppins } from "next/font/google";
import Footer from "@/components/shared/footer";
import { cn } from "@/lib/utils";
export const dynamic = "force-dynamic";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html className="overflow-x-hidden" lang="en">
            <head>
                <ColorSchemeScript />
            </head>
            <body className={cn("min-w-[100vw]", poppins.className)}>
                <MantineProvider>{children}</MantineProvider>
                <Footer />
            </body>
        </html>
    );
}
