"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import { Product } from "../page";
import ProductCard from "@/components/shared/ProductCard";
import { ArrowLeft, ArrowRight } from "iconsax-react";
import { useEffect, useState } from "react";
import { apiBase } from "@/lib/axios";
import TrendingProductsLoading from "./loading/TrendingProductsLoading";
import { populateIsDiscounted } from "@/utils/productPromotion";

export default function Trending() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        apiBase
            .get("/products/trending")
            .then(({ data }) => {
                setProducts(populateIsDiscounted(data));
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setIsLoading(false));
    }, []);
    if (isLoading) {
        return <TrendingProductsLoading />;
    }
    return (
        <>
            <h2 className="font-semibold mt-20 md:text-4xl text-3xl font-mono">
                Trending products
            </h2>

            <Carousel
                opts={{
                    loop: true,
                    dragFree: true,
                }}
            >
                <CarouselContent className="mt-8 pl-10 md:pl-0 ">
                    {products.map((product) => (
                        <CarouselItem
                            key={product.id}
                            className="md:basis-1/2 lg:basis-[300px]"
                        >
                            <ProductCard
                                className="w-auto shadow-[0px_0px_10px] shadow-black/10"
                                promotion={product.promotion}
                                key={product.id}
                                id={product.id}
                                price={product.price as any}
                                image={product.imageURL}
                                isSoldOut={!!product.isSoldOut}
                                name={product.name}
                            />
                        </CarouselItem>
                    ))}{" "}
                </CarouselContent>
                <CarouselPrevious className="sm:flex hidden" />
                <CarouselNext className="md:-right-12 md:top-1/2 md:-translate-y-1/2 left-0 md:left-auto rotate-180 md:rotate-0" />
            </Carousel>
        </>
    );
}
