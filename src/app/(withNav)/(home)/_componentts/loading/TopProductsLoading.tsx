import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";

export default function TopProductLoading() {
    return (
        <section className="mt-20">
            <h2 className="font-semibold text-4xl font-mono">Top products</h2>
            <div className="mt-5 flex w-full flex-wrap justify-center gap-x-5 gap-y-8">
                {Array.from({ length: 8 }).map((_, i) => (
                    <ProductCardSkeleton key={i} className="w-[290px]" />
                ))}
            </div>
        </section>
    );
}
