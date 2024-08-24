import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Hero from "./_componentts/Hero";
import TopProductLoading from "./_componentts/loading/TopProductsLoading";
import TrendingProductsLoading from "./_componentts/loading/TrendingProductsLoading";
import TopProducts from "./_componentts/TopProducts";
import Trending from "./_componentts/Trending";

export default async function Home() {
    return (
        <section className="px-[150px] pb-28 pt-10">
            <Hero />
            <Suspense fallback={<TopProductLoading />}>
                <TopProducts />
            </Suspense>

            <section className="grid  overflow-hidden h-[350px] bg-[#E9E9E9] rounded mt-20 grid-cols-2">
                <div className="p-20">
                    <h2 className="text-3xl font-bold ">
                        Creative harmonious living
                    </h2>
                    <p className="text-lg   text-black/90 mt-2">
                        Our Products are all made to standard sizes so that you
                        can mix and match them freely.
                    </p>
                    <Link
                        href={"/products"}
                        className=" bg-black block w-fit text-white font-medium rounded border px-5 mt-3 py-3"
                    >
                        Shop now
                    </Link>
                </div>
                <Image
                    alt=""
                    src={"/assets/banner1.png"}
                    width={600}
                    height={600}
                    className="w-full h-full object-center object-contain"
                />
            </section>
            <Suspense fallback={<TrendingProductsLoading />}>
                <Trending />
            </Suspense>
            <section className="grid  overflow-hidden h-[350px] bg-[#E9E9E9] rounded mt-20 grid-cols-2">
                <Image
                    alt=""
                    src={"/assets/banner2.png"}
                    width={600}
                    height={600}
                    className="w-full h-full object-center object-contain"
                />

                <div className="p-20">
                    <h2 className="text-3xl font-bold ">
                        Comfortable & Elegant Living
                    </h2>
                    <p className="text-lg   text-black/90 mt-2">
                        Our Products are all made to standard sizes so that you
                        can mix and match them freely.
                    </p>
                    <Link
                        href={"/products"}
                        className=" bg-black block w-fit text-white font-medium rounded border px-5 mt-3 py-3"
                    >
                        Shop now
                    </Link>
                </div>
            </section>
        </section>
    );
}
export type Product = {
    id: number;
    name: string;
    imageURL: string;
    price: string;
    otherImages: string[];
    description?: string;
    isSoldOut?: boolean;
    isPublished?: boolean;
    colors?: string[];
    brandName?: string;
    reference?: string;
    createdAt: string;
    updatedAt: string;
    details?: { value: string; name: string }[];
    promotion?: {
        isDiscounted: boolean;
        discountPercentage: string;
        discountedPrice: number;
    };
};
