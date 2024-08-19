"use client";
import ProductCard from "@/components/shared/ProductCard";
import { apiBase } from "@/lib/axios";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { ArrowLeft, ArrowRight } from "iconsax-react";
import { useEffect, useState } from "react";

export default function SimilarProducts({
  categoriesIds,
}: {
  categoriesIds: number[];
}) {
  const [similarProducts, setSimilarProducts] = useState<SimilarProductType[]>(
    []
  );

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      const productSet = new Set<number>();
      const products: SimilarProductType[] = [];

      for (const c of categoriesIds) {
        try {
          const res = await apiBase.get(`/products/filter/byCategory/${c}`);
          const fetchedProducts = res.data || [];

          fetchedProducts.forEach((item: SimilarProductType) => {
            if (!productSet.has(item.product.id)) {
              productSet.add(item.product.id);
              products.push(item);
            }
          });
        } catch (err) {
          console.error(err);
        }
      }
      setSimilarProducts(products);
    };

    fetchSimilarProducts();
  }, [categoriesIds]);

  if (!similarProducts || similarProducts.length < 3) {
    return null;
  }

  return (
    <section className="w-full px-[150px] ">
      <h2 className="font-semibold mt-20 text-4xl font-mono">
        Similar Products
      </h2>

      <Carousel
        className="mt-5"
        height={350}
        slideSize={{ base: "100%", sm: "50%", md: "320px" }}
        slideGap={{ base: 0, sm: "md" }}
        loop
        align="start"
        nextControlProps={{
          style: { transform: "scale(125%)" },
        }}
        previousControlProps={{
          style: { transform: "scale(125%)" },
        }}
        nextControlIcon={<ArrowRight className="p-1" />}
        previousControlIcon={<ArrowLeft className="p-1" />}
        dragFree
      >
        {similarProducts.map(({ product }) => (
          <Carousel.Slide key={product?.id}>
            <ProductCard
              className="w-auto shadow-[0px_0px_10px] shadow-black/10"
              id={product?.id}
              price={product?.price as any}
              image={product?.imageURL}
              isSoldOut={!!product.isSoldOut}
              name={product.name}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </section>
  );
}

export type SimilarProductType = {
  productsToCategory: {
    productId: number;
    categoryId: number;
  };
  product: {
    id: number;
    name: string;
    imageURL: string;
    price: string;
    otherImages: string[];
    description: string;
    isSoldOut: boolean;
    isPublished: boolean;
    colors: string[];
    brandName: string;
    reference: string;
    createdAt: string;
    updatedAt: string;
    promotion: any | null;
    details: { index: number; name: string; value: string }[];
  };
};
