import Image from "next/image";
import Link from "next/link";
export default function Hero() {
    return (
        <section className="grid md:grid-cols-2 gap-3 lg:h-[600px] w-full ">
            <div className="grid  gap-3 md:h-[300px] h-[150px] overflow-hidden  lg:gap-0 lg:h-full lg:flex ">
                <Link
                    href={"/products/?category=FURNITURE"}
                    className="border-2 w-full relative overflow-hidden  group  "
                >
                    <div className="absolute top-0 left-0 w-full z-10 transition-colors  hover:cursor-pointer h-full bg-black/30 hover:bg-black/20 " />
                    <p className="text-xl lg:text-4xl absolute font-bold bg-none text-white z-50 bottom-6 lg:left-6 left-2 ">
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
            </div>
            <div className="lg:grid grid-cols-2 gap-3   ">
                <Link
                    href={"/products/?category=SKIN CARE"}
                    className="border-2 relative hidden lg:block overflow-hidden group"
                >
                    <div className="absolute top-0 left-0 w-full z-10 transition-colors  hover:cursor-pointer h-full bg-black/20 hover:bg-black/10 " />
                    <p className="text-xl lg:text-4xl absolute font-bold bg-none text-white z-50 bottom-6 lg:left-6 left-2 ">
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
                <div className="h-full grid grid-cols-2 gap-3 lg:gap-0    lg:flex lg:flex-col ">
                    <Link
                        href={"/products/category=KITCHEN"}
                        className="lg:h-1/2 m:h-[300px] h-[220px]  relative  overflow-hidden group   w-full"
                    >
                        <div className="absolute top-0 left-0 w-full z-10 transition-colors  hover:cursor-pointer h-full bg-black/20 hover:bg-black/10 " />
                        <p className="text-xl lg:text-4xl absolute font-bold bg-none text-white z-50 bottom-6 lg:left-6 left-2 ">
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
                        className="w-full   overflow-hidden group relative lg:h-1/2   lg:mt-3"
                    >
                        <div className="absolute top-0 left-0 w-full z-10 transition-colors  hover:cursor-pointer h-full bg-black/20 hover:bg-black/10 " />
                        <p className="text-xl lg:text-4xl absolute font-bold bg-none text-white z-50 bottom-6 lg:left-6 left-2 ">
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
