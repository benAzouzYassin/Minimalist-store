"use client";

import ProductCard from "@/components/shared/ProductCard";
import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import { apiBase } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { populateIsDiscounted } from "@/utils/productPromotion";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [allCategories, setAllCategories] = useState<Category[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

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
        apiBase
            .get("/categories")
            .then((res) => setAllCategories(res.data))
            .catch((err) => console.error(err));
    }, []);

    console.log(allProducts);
    useEffect(() => {
        let filteredProducts = allProducts;

        if (searchQuery) {
            filteredProducts = filteredProducts.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        setVisibleProducts(filteredProducts);
    }, [allProducts, searchQuery]);

    return (
        <section className="pt-20 flex flex-col pb-10 relative min-h-screen">
            <div className="flex w-[1220px] mx-auto items-center ">
                <h2 className="font-semibold text-4xl font-mono">
                    In sale products
                </h2>
            </div>
            <section className="flex gap-4 mt-5">
                <section className="gap-y-5 gap-x-6 mx-auto !w-[1220px]  grid grid-cols-4 justify-center">
                    {isLoading &&
                        Array.from({ length: 5 }).map((_, i) => (
                            <ProductCardSkeleton
                                className="w-[290px]"
                                key={i}
                            />
                        ))}

                    {visibleProducts.map((p) => (
                        <ProductCard
                            className={cn("w-[290px]")}
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

type Category = {
    createdAt: string;
    description: string;
    id: number;
    imageURL: string;
    name: string;
    updatedAt: string;
};

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
