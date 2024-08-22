import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";

export default function TrendingProductsLoading() {
    return (
        <>
            <h2 className="font-semibold mt-20 text-4xl font-mono">
                Trending products
            </h2>
            <div className="grid grid-cols-4 gap-3">
                <ProductCardSkeleton className="w-auto shadow-[0px_0px_10px] shadow-black/10" />
                <ProductCardSkeleton className="w-auto shadow-[0px_0px_10px] shadow-black/10" />
                <ProductCardSkeleton className="w-auto shadow-[0px_0px_10px] shadow-black/10" />
                <ProductCardSkeleton className="w-auto shadow-[0px_0px_10px] shadow-black/10" />
            </div>
        </>
    );
}
