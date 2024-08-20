"use client";
import ProductCard from "@/components/shared/ProductCard";
import { Product } from "../page";

type Props = {
    products: Product[];
};
export default function TopProducts({ products }: Props) {
    return (
        <section className="mt-20">
            <h2 className="font-semibold text-4xl font-mono">Top products</h2>
            <div className="mt-5 grid grid-cols-4 gap-x-5 gap-y-8">
                {products.map((product) => (
                    <ProductCard
                        className="w-auto"
                        key={product.id}
                        id={product.id}
                        price={product.price as any}
                        image={product.imageURL}
                        isSoldOut={!!product.isSoldOut}
                        name={product.name}
                    />
                ))}
            </div>
        </section>
    );
}
