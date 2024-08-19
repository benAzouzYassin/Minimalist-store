"use client";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { Product } from "../page";
import ProductCard from "@/components/shared/ProductCard";
import { ArrowLeft, ArrowRight } from "iconsax-react";

type Props = {
  products: Product[];
};
export default function Trending({ products }: Props) {
  return (
    <>
      <h2 className="font-semibold mt-20 text-4xl font-mono">
        Trending products
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
        {products.map((product) => (
          <Carousel.Slide>
            <ProductCard
              className="w-auto shadow-[0px_0px_10px] shadow-black/10"
              key={product.id}
              id={product.id}
              price={product.price as any}
              image={product.imageURL}
              isSoldOut={!!product.isSoldOut}
              name={product.name}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
}
