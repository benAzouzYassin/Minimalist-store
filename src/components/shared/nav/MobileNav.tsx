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
    <Link
        href={href}
        onClick={onClick}
        className="group w-[100vw] active:bg-neutral-100 text-center active:scale-95 transition-all border relative inline-block py-2 text-2xl font-mono "
    >
        {name}
    </Link>
);

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
                <AlignJustify className="sm:scale-150 scale-125 absolute top-1/2 -translate-y-1/2 right-5 sm:hidden" />
            </DrawerTrigger>
            <DrawerContent className="h-[80vh]">
                <DrawerHeader className="text-center">
                    <DrawerTitle>Menu</DrawerTitle>
                </DrawerHeader>
                <nav className="flex  flex-grow flex-col items-center justify-center px-4">
                    <div className="space-y-6  text-black">
                        {navItems.map((item) => (
                            <NavItem
                                onClick={() => setIsOpen(false)}
                                key={item.name}
                                {...item}
                            />
                        ))}
                        <div
                            onClick={() => setIsOpen(false)}
                            className="group h-fit w-[100vw] active:bg-neutral-100 text-center active:scale-95 transition-all border relative inline-block  text-2xl font-mono "
                        >
                            <Cart className=" flex items-center justify-center scale-125  w-full static h-[50px]" />
                        </div>
                    </div>
                </nav>
                <DrawerClose className="absolute right-4 top-4">
                    <X className="h-6 w-6" />
                </DrawerClose>
            </DrawerContent>
        </Drawer>
    );
}
