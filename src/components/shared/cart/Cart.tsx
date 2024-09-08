/* eslint-disable @next/next/no-img-element */
"use client";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import CartItem from "./CartItem";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/global-stores/cartStore";
import Link from "next/link";
import { cn } from "@/lib/utils";
import posthog from "posthog-js";
import { X } from "lucide-react";
import { useIsSmallScreen } from "@/hooks/usIsSmallScreen";

type Props = {
    className?: string;
};
export default function Cart(props: Props) {
    const isSmallScreen = useIsSmallScreen();
    const { products, isOpen, setIsOpen } = useCartStore();
    const subtotal = products.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
    );
    if (isSmallScreen) {
        return (
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerTrigger
                    className={cn(" absolute right-[65px]", props.className)}
                >
                    <CartIcon />
                </DrawerTrigger>
                <DrawerContent className=" h-[90vh]">
                    <DrawerHeader className="text-center">
                        <DrawerTitle>Menu</DrawerTitle>
                    </DrawerHeader>
                    <div className="flex flex-col h-full ">
                        <div className="flex-grow px-2 pb-4 flex flex-col gap-3 sm:mt-0 mt-5  overflow-auto max-h-[70%]">
                            {products.length > 0 ? (
                                products.map((product, index) => (
                                    <CartItem key={index} product={product} />
                                ))
                            ) : (
                                <div className="h-full flex items-center justify-center flex-col">
                                    <img
                                        alt=""
                                        className="w-[200px]"
                                        src="/assets/empty-cart.png"
                                    />
                                    <p className="text-center pl-5 text-xl font-semibold w-full">
                                        Your cart is empty.
                                    </p>
                                    <Button
                                        onClick={() => setIsOpen(false)}
                                        variant={"secondary"}
                                        className="mt-3 border-2 border-black/30  font-semibold ml-5 rounded active:scale-95 transition-all bg-neutral-200 "
                                    >
                                        Keep browsing
                                    </Button>
                                </div>
                            )}
                        </div>
                        <div className="px-2 flex flex-col absolute w-full bottom-1 ">
                            {products.length > 0 && (
                                <div className=" relative mt-auto ">
                                    <div className="flex mt-2 pb-1 items-center">
                                        <span className="text-lg font-medium">
                                            Subtotal
                                        </span>
                                        <span className="font-bold  ml-auto">
                                            {subtotal.toFixed(2)}$
                                        </span>
                                    </div>
                                    <Link
                                        href={"/checkout"}
                                        onClick={() => {
                                            setIsOpen(false);
                                            posthog?.capture(
                                                "checkout_button_clicked"
                                            );
                                        }}
                                    >
                                        <Button className="w-full active:scale-95 transition-all hover:bg-white hover:text-black border-black border-2 rounded mt-1">
                                            Go to checkout
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    <DrawerClose className="absolute right-4 top-4">
                        <X className="h-6 w-6" />
                    </DrawerClose>
                </DrawerContent>
            </Drawer>
        );
    }
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className={cn(props.className)}>
                <CartIcon />
            </SheetTrigger>
            <SheetContent className="sm:max-w-[450px]  ">
                <SheetHeader>
                    <SheetTitle className="text-lg sm:mt-0 mt-1 text-left font-bold mb-2">
                        Shopping Cart
                    </SheetTitle>
                    <div className="flex flex-col h-[100vh] ">
                        <div className="flex-grow pb-4 flex flex-col gap-3 sm:mt-0 mt-5  overflow-auto max-h-[calc(100%-155px)]">
                            {products.length > 0 ? (
                                products.map((product, index) => (
                                    <CartItem key={index} product={product} />
                                ))
                            ) : (
                                <div className="h-full flex items-center justify-center flex-col">
                                    <img
                                        alt=""
                                        className="w-[200px]"
                                        src="/assets/empty-cart.png"
                                    />
                                    <p className="text-center pl-5 text-xl font-semibold w-full">
                                        Your cart is empty.
                                    </p>
                                    <Button
                                        onClick={() => setIsOpen(false)}
                                        variant={"secondary"}
                                        className="mt-3 border-2 border-black/30  font-semibold ml-5 rounded active:scale-95 transition-all bg-neutral-200 "
                                    >
                                        Keep browsing
                                    </Button>
                                </div>
                            )}
                        </div>
                        {products.length > 0 && (
                            <div className="h-[158px] relative">
                                <div className="flex mt-2 pb-1 items-center">
                                    <span className="text-lg font-medium">
                                        Subtotal
                                    </span>
                                    <span className="font-bold  ml-auto">
                                        {subtotal.toFixed(2)}$
                                    </span>
                                </div>
                                <Link
                                    href={"/checkout"}
                                    onClick={() => {
                                        setIsOpen(false);
                                        posthog?.capture(
                                            "checkout_button_clicked"
                                        );
                                    }}
                                >
                                    <Button className="w-full active:scale-95 transition-all hover:bg-white hover:text-black border-black border-2 rounded mt-1">
                                        Go to checkout
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}

function CartIcon() {
    return (
        <svg
            className="active:scale-95 transition-transform hover:cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="26"
            height="26"
        >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M4 16V4H2V2h3a1 1 0 0 1 1 1v12h12.438l2-8H8V5h13.72a1 1 0 0 1 .97 1.243l-2.5 10a1 1 0 0 1-.97.757H5a1 1 0 0 1-1-1zm2 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm12 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path>
        </svg>
    );
}
