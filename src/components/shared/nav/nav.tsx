import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
const Cart = dynamic(() => import("../cart/Cart"));
import MobileNav from "./MobileNav";
import dynamic from "next/dynamic";

export default function Nav() {
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            className={cn(
                "bg-white transition-all shadow h-[65px] sm:h-[var(---nav-height)]  z-[60] flex items-center px-[150px]   fixed  w-full  top-0 left-0",
                { " h-[50px] sm:!h-[70px]": isFixed }
            )}
        >
            <Cart className="sm:scale-125 absolute top-1/2 -translate-y-1/2 right-[60px] sm:right-[75px] sm:hidden" />
            <MobileNav />
            <ul className="ml-auto sm:flex hidden items-center  text-[20px] gap-8 font-mono ">
                <li className="active:scale-95 transition-transform">
                    <Link className="group relative  " href={"/"}>
                        Home
                        <div className="group-hover:w-[70%] bottom-2 duration-300 ease-out transition-all bg-black h-[2px] w-0" />
                    </Link>
                </li>
                <li className="active:scale-95 transition-transform">
                    <Link className="group relative  " href={"/products"}>
                        Products
                        <div className="group-hover:w-[70%] bottom-2 duration-300 ease-out transition-all bg-black h-[2px] w-0" />
                    </Link>
                </li>
                <li className="active:scale-95 transition-transform">
                    <Link className="group relative  " href={"/promotions"}>
                        Promotions
                        <div className="group-hover:w-[70%] bottom-2 duration-300 ease-out transition-all bg-black h-[2px] w-0" />
                    </Link>
                </li>
                <li className="active:scale-95 transition-transform">
                    <Link className="group relative  " href={"/favorites"}>
                        Favorites
                        <div className="group-hover:w-[70%] bottom-2 duration-300 ease-out transition-all bg-black h-[2px] w-0" />
                    </Link>
                </li>
                <li>
                    <Cart />
                </li>
            </ul>
        </nav>
    );
}
