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
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState(
        searchParams.get("category") || "ALL CATEGORIES"
    );
    const [allCategories, setAllCategories] = useState<Category[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        apiBase
            .get("/products")
            .then(({ data }) => setAllProducts(data))
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
        apiBase
            .get("/categories")
            .then((res) => setAllCategories(res.data))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        // Filter products based on category and search query
        let filteredProducts = allProducts;

        if (selectedCategory !== "ALL CATEGORIES") {
            filteredProducts = filteredProducts.filter((product) =>
                product.categories.some(
                    (cat) =>
                        cat.category.name.toUpperCase() === selectedCategory
                )
            );
        }

        if (searchQuery) {
            filteredProducts = filteredProducts.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setVisibleProducts(filteredProducts);
    }, [allProducts, selectedCategory, searchQuery]);

    return (
        <section className="pt-10 flex flex-col pb-10 relative min-h-screen">
            <div className="flex w-[1220px] mx-auto items-center ">
                <div className="relative w-[350px]">
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="pl-9 focus-within:pl-10 transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute top-1/2 left-2 -translate-y-1/2 text-neutral-400" />
                </div>
                <Select
                    onValueChange={(val) => {
                        setSelectedCategory(val);
                        router.replace(`/products/?category=${val}`);
                    }}
                    value={selectedCategory}
                >
                    <SelectTrigger className="w-[300px] ml-auto">
                        {selectedCategory.toUpperCase()}
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={"ALL CATEGORIES"}>
                            ALL CATEGORIES
                        </SelectItem>
                        {allCategories.map((c) => (
                            <SelectItem key={c.id} value={c.name.toUpperCase()}>
                                {c.name.toUpperCase()}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <section className="flex gap-4 mt-5">
                <section className="gap-y-5 gap-x-6 mx-auto !w-[1220px]  grid grid-cols-4 justify-center">
                    {isLoading &&
                        Array.from({ length: 20 }).map((_, i) => (
                            <ProductCardSkeleton
                                className="w-[290px]"
                                key={i}
                            />
                        ))}

                    {visibleProducts.map((p) => (
                        <ProductCard
                            className={cn("w-[290px]")}
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
    categories: {
        productId: number;
        categoryId: number;
        category: {
            createdAt: string;
            description: string;
            id: number;
            imageURL: string;
            name: string;
            updatedAt: string;
        };
    }[];
};