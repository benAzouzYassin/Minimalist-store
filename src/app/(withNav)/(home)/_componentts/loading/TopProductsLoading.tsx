import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";

export default function TopProductLoading() {
    return (
        <section className="md:mt-20">
            <h2 className=" md:block hidden font-semibold text-4xl font-mono">
                Top products
            </h2>
            <div className="mt-5 md:flex grid grid-cols-2 gap-y-3 gap-x-5 w-full  overflow-hidden flex-wrap justify-center   md:gap-x-5 md:gap-y-8">
                {Array.from({ length: 8 }).map((_, i) => (
                    <ProductCardSkeleton
                        key={i}
                        className="md:w-[290px] w-[175px]"
                    />
                ))}
            </div>
        </section>
    );
}
