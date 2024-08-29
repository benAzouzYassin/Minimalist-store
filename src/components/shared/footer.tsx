import {
    DeviceMessage,
    Facebook,
    Headphones,
    Instagram,
    MoneyTick,
    Truck,
    TruckFast,
} from "iconsax-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer
            className="relative h-[195px] bg-black"
            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
            <div className="fixed pt-20   bottom-0   h-[195px] w-full text-white">
                <div className="flex px-28 ">
                    <div className="flex w-1/4 gap-2 h-12  ">
                        <div>
                            <Truck className="w-6 h-6 text-red-500" />
                        </div>
                        <div className=" flex flex-col">
                            <p className="font-semibold">Home Delivery</p>
                            <p className="font-normal opacity-70 mt-auto text-xs">
                                Fast home delivery
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2 h-12   w-1/4 justify-center border-l ">
                        <div>
                            <DeviceMessage className="w-6 h-6 text-red-500" />
                        </div>
                        <div className=" flex flex-col">
                            <p className="font-semibold">24/7 Support </p>
                            <p className="font-normal opacity-70 mt-auto text-xs">
                                Permanently available
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2 h-12   w-1/4 justify-center border-l ">
                        <div>
                            <MoneyTick className="w-6 h-6 text-red-500" />
                        </div>
                        <div className=" flex flex-col">
                            <p className="font-semibold"> Cash on Delivery</p>
                            <p className="font-normal opacity-70 mt-auto text-xs">
                                Payment at home upon receipt
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2 h-12   w-1/4 justify-center border-l ">
                        <div>
                            <TruckFast className="w-6 h-6 text-red-500" />
                        </div>
                        <div className=" flex flex-col">
                            <p className="font-semibold">Fast delivery </p>
                            <p className="font-normal opacity-70 mt-auto text-xs">
                                Guaranteed speed of delivery
                            </p>
                        </div>
                    </div>
                </div>

                <div className=" flex px-28  mt-8 opacity-80  text-sm font-normal">
                    © 2024{" "}
                    <Link
                        target="_blank"
                        className="mx-1  underline underline-offset-4"
                        href={"https://yassinebenazouz.vercel.app/"}
                    >
                        Yassine ben azouz
                    </Link>
                    . All rights reserved
                    <div className="scale-125 gap-2  flex ml-auto">
                        <Facebook className="ml-auto " />
                        <Instagram />
                    </div>
                </div>
            </div>
        </footer>
    );
}
