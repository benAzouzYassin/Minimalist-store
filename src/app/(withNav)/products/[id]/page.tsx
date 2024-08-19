import NotFoundPage from "@/app/not-found";
import { apiBase } from "@/lib/axios";
import MainDetails from "./_components/MainDetails";
import SimilarProducts from "./_components/SimilarProducts";

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  try {
    const { data } = await apiBase.get(`/products/${params.id}`);
    console.log("product categories ==>", data);
    return (
      <section className="min-h-screen pb-20">
        <MainDetails product={data} />
        <div className="grid grid-cols-4 px-[150px] mt-10 gap-5">
          {data?.details?.map((item: any) => {
            return (
              <div
                key={item.name}
                className="min-h-[200px]  flex items-center flex-col justify-center border rounded-lg"
              >
                <p className="text-xl font-semibold  ">{item.name}</p>
                <p className="text-center mt-1 opacity-90">{item.value}</p>
              </div>
            );
          })}
        </div>
        <SimilarProducts
          categoriesIds={
            data?.categories?.map((item: any) => item?.categoryId) ?? []
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
  promotion?: any;
  details?: { value: string; name: string }[];
};
