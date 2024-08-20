"use client";
import Nav from "@/components/shared/nav/nav";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Nav />
            <NextTopLoader
                color="#010101f2"
                initialPosition={0.08}
                crawlSpeed={400}
                height={6}
                crawl={true}
                showSpinner={true}
                easing="ease"
                speed={200}
                zIndex={1600}
                showAtBottom={false}
            />
            <main className=" min-w-[100vw] mt-[var(---nav-height)]">
                {children}
            </main>
        </>
    );
}
