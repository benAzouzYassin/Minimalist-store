import Link from "next/link";
import Cart from "../cart/Cart";

export default function Nav() {
    return (
        <nav className="bg-white h-[var(---nav-height)] z-[60] flex items-center px-[150px]  shadow  w-full fixed top-0 left-0">
            <Link href={"/"}>
                <Logo />
            </Link>
            <ul className="ml-auto flex items-center  text-[20px] gap-8 font-mono ">
                <li className="active:scale-95 transition-transform">
                    <Link className="group relative  " href={"/products"}>
                        Products
                        <div className="group-hover:w-[70%] bottom-2 duration-300 ease-out transition-all bg-black h-[2px] w-0" />
                    </Link>
                </li>
                <li className="active:scale-95 transition-transform">
                    <Link className="group relative  " href={"#"}>
                        Promotions
                        <div className="group-hover:w-[70%] bottom-2 duration-300 ease-out transition-all bg-black h-[2px] w-0" />
                    </Link>
                </li>
                <li className="active:scale-95 transition-transform">
                    <Link className="group relative  " href={"#"}>
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
function Logo() {
    return (
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#B6002C]"></div>
    );
}
