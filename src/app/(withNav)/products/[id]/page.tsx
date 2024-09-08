const NotFoundPage = dynamic(() => import("@/app/not-found"));
import { apiBase } from "@/lib/axios";
import MainDetails from "./_components/MainDetails";
const SimilarProducts = dynamic(() => import("./_components/SimilarProducts"));
import { populateIsDiscounted } from "@/utils/productPromotion";
import dynamic from "next/dynamic";
import posthog from "posthog-js";

type Props = {
    params: { id: string };
};

export default async function Page({ params }: Props) {
    try {
        const { data } = await apiBase.get(`/products/${params.id}`);
        const product = populateIsDiscounted(data);

        return (
            <section className="min-h-screen pb-20">
                <MainDetails product={product} />
                <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-4 px-5 md:px-[80px] lg:px-[150px] mt-10 gap-5">
                    {product?.details?.map((item: any) => {
                        return (
                            <div
                                key={item.name}
                                className="min-h-[200px]  flex items-center flex-col justify-center border rounded-lg"
                            >
                                <p className="text-xl font-semibold  ">
                                    {item.name}
                                </p>
                                <p className="text-center mt-1 opacity-90">
                                    {item.value}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <SimilarProducts
                    categoriesIds={
                        product?.categories?.map(
                            (item: any) => item?.categoryId
                        ) ?? []
                    }
                />
            </section>
        );
    } catch (error) {
        return <NotFoundPage />;
    }
}

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
    promotion?: {
        isDiscounted: boolean;
        discountPercentage: string;
        discountedPrice: number;
    };
    details?: { value: string; name: string }[];
    isTop: boolean;
    isTrending: boolean;
};
