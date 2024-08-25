const ProductCard = dynamic(() => import("@/components/shared/ProductCard"));
import dynamic from "next/dynamic";
import { Product } from "../page";
import { apiBase } from "@/lib/axios";
import { populateIsDiscounted } from "@/utils/productPromotion";

export default async function TopProducts() {
    const data = (await apiBase.get("/products/top")).data as
        | Product[]
        | undefined;
    const topProducts = populateIsDiscounted(data);
    return (
        <section className="mt-20">
            <h2 className="font-semibold text-4xl font-mono">Top products</h2>
            <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-8">
                {topProducts?.map((product: Product) => (
                    <ProductCard
                        className=" w-[290px]"
                        promotion={product.promotion}
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
