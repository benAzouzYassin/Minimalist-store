import React, { useState } from "react";
import { AlignJustify, X } from "lucide-react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";
import Cart from "../cart/Cart";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Promotions", href: "/promotions" },
    { name: "Favorites", href: "/favorites" },
];

const NavItem = ({
    name,
    href,
    onClick,
}: {
    onClick: () => void;
    name: string;
    href: string;
}) => (
    <li
        onClick={onClick}
        className="w-[100vw] active:bg-neutral-100 text-center active:scale-95 transition-all border "
    >
        <Link
            href={href}
            className="group relative inline-block py-2 text-2xl font-mono transition-transform "
        >
            {name}
        </Link>
    </li>
);

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
                <AlignJustify className="scale-150 absolute top-1/2 -translate-y-1/2 right-5 sm:hidden" />
            </DrawerTrigger>
            <DrawerContent className="h-[80vh]">
                <DrawerHeader className="text-center">
                    <DrawerTitle>Menu</DrawerTitle>
                </DrawerHeader>
                <nav className="flex  flex-grow flex-col items-center justify-center px-4">
                    <ul className="space-y-6  text-black">
                        {navItems.map((item) => (
                            <NavItem
                                onClick={() => setIsOpen(false)}
                                key={item.name}
                                {...item}
                            />
                        ))}
                        <li className="pt-4 flex items-center justify-center">
                            <Cart className="scale-150" />
                        </li>
                    </ul>
                </nav>
                <DrawerClose className="absolute right-4 top-4">
                    <X className="h-6 w-6" />
                </DrawerClose>
            </DrawerContent>
        </Drawer>
    );
}
