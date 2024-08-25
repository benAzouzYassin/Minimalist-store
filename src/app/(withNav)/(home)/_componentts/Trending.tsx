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
            <h2 className="font-semibold mt-20 text-4xl font-mono">
                Trending products
            </h2>

            <Carousel
                opts={{
                    loop: true,
                    dragFree: true,
                }}
            >
                <CarouselContent>
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
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </>
    );
}
