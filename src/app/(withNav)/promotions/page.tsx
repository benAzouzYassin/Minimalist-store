"use client";

import ProductCard from "@/components/shared/ProductCard";
import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import { apiBase } from "@/lib/axios";
import { populateIsDiscounted } from "@/utils/productPromotion";
import { useEffect, useState } from "react";

export default function Page() {
    const [allProducts, setAllProducts] = useState<Product[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        apiBase
            .get("/products/onPromotion")
            .then(({ data }) => {
                const items = data?.map?.((item: any) => ({
                    ...item?.product,
                    promotion: item?.promotion,
                }));
                setAllProducts(populateIsDiscounted(items));
            })
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
    }, []);
    return (
        <section className="pt-10 flex flex-col px-4 md:px-10 lg:px-[100px] pb-10 relative min-h-screen">
            <div className="flex max-w-[1220px] items-center ">
                <h2 className="font-semibold text-3xl md:text-4xl w-full text-left font-mono">
                    In sale products
                </h2>
            </div>
            <section className="flex gap-4 mt-5">
                <section className="gap-y-5 gap-x-4 justify-center sm:gap-x-6 max-w-[1220px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {isLoading && (
                        <div className="flex w-[90vw] md:justify-center  flex-wrap gap-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <ProductCardSkeleton
                                    className="w-full md:w-[300px]"
                                    key={i}
                                />
                            ))}
                        </div>
                    )}

                    {allProducts.map((p) => (
                        <ProductCard
                            className="w-full mx-auto md:mx-0"
                            promotion={p.promotion}
                            key={p.id}
                            id={p.id}
                            image={p.imageURL}
                            price={p.price}
                            isSoldOut={!!p.isSoldOut}
                            name={p.name}
                        />
                    ))}
                </section>
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
    promotion?: any;
    details?: { value: string; name: string }[];
    isTop: boolean;
    isTrending: boolean;
};
