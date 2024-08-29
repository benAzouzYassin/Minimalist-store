"use client";

import ProductCard from "@/components/shared/ProductCard";
import { useFavoritesStore } from "@/global-stores/favoritesStore";
import EmptyPage from "./_components/EmptyPage";

export default function Page() {
    const products = useFavoritesStore((s) => s.products);
    if (products.length < 1) {
        return <EmptyPage />;
    }
    return (
        <section className="min-h-screen pt-10 max-w-[1500px]   px-[100px] pb-20">
            <h2 className="font-semibold text-4xl font-mono">
                Favorite products
            </h2>
            <div className="mt-5 grid grid-cols-4  justify-center gap-x-5 gap-y-8">
                {products.map((p) => (
                    <ProductCard
                        className="w-[300px]"
                        key={p?.id}
                        promotion={p.promotion}
                        id={p.id}
                        image={p.imageURL}
                        price={p.price}
                        isSoldOut={!!p.isSoldOut}
                        name={p.name}
                    />
                ))}
            </div>
        </section>
    );
}
