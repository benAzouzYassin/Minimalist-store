import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";

export default function TrendingProductsLoading() {
    return (
        <>
            <h2 className="font-semibold mt-20 md:text-4xl text-3xl font-mono">
                Trending products
            </h2>
            <div className="grid  xl:grid-cols-4 md:grid-cols-3  grid-cols-2 mt-5 gap-3">
                <ProductCardSkeleton className="w-auto shadow-[0px_0px_10px] shadow-black/10" />
                <ProductCardSkeleton className="w-auto shadow-[0px_0px_10px] shadow-black/10" />
                <ProductCardSkeleton className="w-auto shadow-[0px_0px_10px] md:block hidden  shadow-black/10" />
                <ProductCardSkeleton className="w-auto shadow-[0px_0px_10px] xl:block hidden shadow-black/10" />
            </div>
        </>
    );
}
