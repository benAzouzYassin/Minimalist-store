import Image from "next/image";
import Link from "next/link";
export default function Hero() {
    return (
        <section className="grid grid-cols-2 gap-3 h-[600px] w-full ">
            <Link
                href={"/products/?category=FURNITURE"}
                className="border-2 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full z-10 transition-colors  hover:cursor-pointer h-full bg-black/30 hover:bg-black/20 " />
                <p className="text-4xl absolute font-bold bg-none text-white z-50 bottom-6 left-6 ">
                    Live comfortably
                </p>
                <Image
                    src={"/assets/hero-images/1.png"}
                    className="w-full h-full 300 object-cover object-center group-hover:scale-[102%] group-active:scale-100 duration-300 transition-transform"
                    loading="eager"
                    quality={100}
                    width={500}
                    height={500}
                    alt={""}
                />
            </Link>
            <div className="grid grid-cols-2 gap-3   ">
                <Link
                    href={"/products/?category=SKIN CARE"}
                    className="border-2 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full z-10 transition-colors  hover:cursor-pointer h-full bg-black/20 hover:bg-black/10 " />
                    <p className="text-4xl absolute font-bold bg-none text-white z-50 bottom-6 left-6 ">
                        HW Skincare
                    </p>
                    <Image
                        src={"/assets/hero-images/3.png"}
                        className="w-full h-full 300 object-cover group-hover:scale-[102%] group-active:scale-100 duration-300 transition-transform"
                        loading="eager"
                        quality={100}
                        width={500}
                        height={500}
                        alt={""}
                    />
                </Link>
                <div className="h-full  flex flex-col ">
                    <Link
                        href={"/products/category=KITCHEN"}
                        className="h-1/2 relative  overflow-hidden group   w-full">
                        <div className="absolute top-0 left-0 w-full z-10 transition-colors  hover:cursor-pointer h-full bg-black/20 hover:bg-black/10 " />
                        <p className="text-4xl absolute font-bold bg-none text-white z-50 bottom-6 left-6 ">
                            Kitchen & Dining
                        </p>
                        <Image
                            src={"/assets/hero-images/2.png"}
                            className="w-full h-full 300 object-cover group-hover:scale-[102%] group-active:scale-100 duration-300 transition-transform"
                            loading="eager"
                            quality={100}
                            width={500}
                            height={500}
                            alt={""}
                        />
                    </Link>
                    <Link
                        href={"/products?category=ELECTRONICS"}
                        className="w-full   overflow-hidden group relative h-1/2   mt-3">
                        <div className="absolute top-0 left-0 w-full z-10 transition-colors  hover:cursor-pointer h-full bg-black/20 hover:bg-black/10 " />
                        <p className="text-4xl absolute font-bold bg-none text-white z-50 bottom-6 left-6 ">
                            Home Electronics
                        </p>
                        <Image
                            src={"/assets/hero-images/4.png"}
                            className="w-full h-full 300 object-cover group-hover:scale-[102%] group-active:scale-100 duration-300 transition-transform"
                            loading="eager"
                            quality={100}
                            width={500}
                            height={500}
                            alt={""}
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}
