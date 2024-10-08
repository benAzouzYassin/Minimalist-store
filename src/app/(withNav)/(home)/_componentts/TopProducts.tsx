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
        <section className="md:mt-20">
            <h2 className="font-semibold md:block hidden md:text-4xl text-3xl font-mono">
                Top products
            </h2>
            <div className="mt-5 md:flex grid grid-cols-2 gap-3 flex-wrap justify-center md:gap-x-5 md:gap-y-8">
                {topProducts?.map((product: Product) => (
                    <ProductCard
                        className=" w-auto md:w-[290px]"
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
