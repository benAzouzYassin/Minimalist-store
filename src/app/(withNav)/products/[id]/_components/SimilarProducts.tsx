"use client";
import ProductCard from "@/components/shared/ProductCard";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import { apiBase } from "@/lib/axios";
import { populateIsDiscounted } from "@/utils/productPromotion";
import { useEffect, useState } from "react";

export default function SimilarProducts({
    categoriesIds,
}: {
    categoriesIds: number[];
}) {
    const [similarProducts, setSimilarProducts] = useState<
        SimilarProductType[]
    >([]);

    useEffect(() => {
        const fetchSimilarProducts = async () => {
            const productSet = new Set<number>();
            const products: SimilarProductType[] = [];

            for (const c of categoriesIds) {
                try {
                    const res = await apiBase.get(
                        `/products/filter/byCategory/${c}`
                    );
                    const fetchedProducts = res.data || [];

                    fetchedProducts.forEach((product: SimilarProductType) => {
                        if (!productSet.has(product.id)) {
                            productSet.add(product.id);
                            products.push(populateIsDiscounted(product));
                        }
                    });
                } catch (err) {
                    console.error(err);
                }
            }
            setSimilarProducts(products);
        };

        fetchSimilarProducts();
    }, [categoriesIds]);

    if (!similarProducts || similarProducts.length < 3) {
        return null;
    }
    return (
        <section className="w-full px-[150px] ">
            <h2 className="font-semibold mt-20 text-4xl font-mono">
                Similar Products
            </h2>
            <Carousel
                opts={{
                    loop: true,
                    dragFree: true,
                }}
            >
                <CarouselContent>
                    {similarProducts.map((product) => (
                        <CarouselItem
                            key={product.id}
                            className="md:basis-1/2 lg:basis-[300px]"
                        >
                            <ProductCard
                                className="w-auto shadow-[0px_0px_10px] shadow-black/10"
                                id={product?.id}
                                price={product?.price as any}
                                image={product?.imageURL}
                                isSoldOut={!!product.isSoldOut}
                                name={product.name}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    );
}
export type SimilarProductType = {
    id: number;
    name: string;
    imageURL: string;
    price: string;
    otherImages: string[];
    description: string;
    isSoldOut: boolean;
    isPublished: boolean;
    colors: string[];
    brandName: string;
    reference: string;
    createdAt: string;
    updatedAt: string;
    promotion: {
        endDate: string;
        startDate: string;
        discountPercentage: string;
        discountedPrice: string;
    };
    details: {
        index: number;
        name: string;
        value: string;
    };
    isTop: boolean;
    isTrending: boolean;
};
