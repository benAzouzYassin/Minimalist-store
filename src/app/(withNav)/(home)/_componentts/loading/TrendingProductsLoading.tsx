import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";

export default function TrendingProductsLoading() {
    return (
        <>
            <h2 className="font-semibold mt-20 md:text-4xl text-3xl font-mono">
                Trending products
            </h2>
            <div className="grid  lg:grid-cols-4  mt-5 gap-3">
                <ProductCardSkeleton className="w-auto shadow-[0px_0px_10px] shadow-black/10" />
                <ProductCardSkeleton className=" md:block  hidden w-auto shadow-[0px_0px_10px] shadow-black/10" />
                <ProductCardSkeleton className=" md:block  hidden w-auto shadow-[0px_0px_10px] shadow-black/10" />
                <ProductCardSkeleton className=" md:block  hidden w-auto shadow-[0px_0px_10px] shadow-black/10" />
            </div>
        </>
    );
}
