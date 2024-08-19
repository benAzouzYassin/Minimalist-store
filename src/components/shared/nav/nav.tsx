import { Ankr, BagHappy, Car, ShoppingCart } from "iconsax-react";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="bg-white h-[var(---nav-height)] z-50 flex items-center px-[150px]  shadow  w-full fixed top-0 left-0">
      <Link href={"/"}>
        <Logo />
      </Link>
      <ul className="ml-auto flex items-center  text-[20px] gap-8 font-mono ">
        <li className="active:scale-95 transition-transform">
          <Link className="group relative  " href={"#"}>
            Products
            <div className="group-hover:w-[70%] bottom-2 duration-300 ease-out transition-all bg-black h-[2px] w-0" />
          </Link>
        </li>
        <li className="active:scale-95 transition-transform">
          <Link className="group relative  " href={"#"}>
            Favorites
            <div className="group-hover:w-[70%] bottom-2 duration-300 ease-out transition-all bg-black h-[2px] w-0" />
          </Link>
        </li>
        <li className="active:scale-95 transition-transform">
          <Link className="group relative  " href={"#"}>
            About
            <div className="group-hover:w-[70%] bottom-2 duration-300 ease-out transition-all bg-black h-[2px] w-0" />
          </Link>
        </li>
        <li>
          <CartIcon />
        </li>
      </ul>
    </nav>
  );
}
function Logo() {
  return (
    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#B6002C]">
      <BagHappy className="text-white w-8 h-8 stroke-[4] stroke-[#fff]" />
    </div>
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
