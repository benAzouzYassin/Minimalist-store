"use client";
import { Button } from "@/components/ui/button";
import { Heart } from "iconsax-react";
import { Minus, Plus } from "lucide-react";
import { Product } from "../page";
import ProductImages from "./ProductImages";

type Props = {
  product: Product;
};
// TODO add the promotion prices
export default function MainDetails({ product }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 px-[200px] pt-10 ">
      <div className="min-h-[400px] ">
        <ProductImages
          mainImage={product.imageURL}
          otherImages={product.otherImages}
        />
      </div>

      <div className="bg-neutral-100 py-14 px-8">
        <h1 className="text-3xl font-bold line-clamp-2">{product.name}</h1>
        <p className="font-medium text-sm opacity-50">
          Referecne : {product.reference}
        </p>
        {product.isSoldOut ? (
          <div className=" text-red-500 scale-90  -ml-2 mt-2 bg-red-200 py-1 rounded-full px-5 w-fit font-bold ">
            Out of stock
          </div>
        ) : (
          <div className=" text-green-500 scale-90 -ml-2 mt-2 bg-green-200 py-1 rounded-full px-5 w-fit font-bold ">
            In stock
          </div>
        )}
        <p className="text-[28px] mt-3 mb-1 font-bold opacity-90 ">
          {Number(product.price).toFixed(2)}$
        </p>
        {/* <hr className="border mt-3" /> */}
        <p className="text-black/60 font-medium mt-2 ">
          The rounded square design of the toaster allows it to fit neatly
          against a wall, or inside a corner. Excellent at defrosting, and with
          the perfect breadtoheater distance to give crunchy toast with a soft,
          spongey middle.
        </p>
        <div className=" mt-10 flex  gap-2 ">
          <div className="border  grid grid-cols-3 h-[50px] justify-center items-center w-[150px] overflow-hidden border-black rounded-xl font-bold">
            <button className="flex items-center  active:scale-95 transition-all hover:bg-neutral-200  h-full justify-center">
              <Plus className="stroke-[2.5]" />
            </button>
            <button className="flex items-center justify-center text-lg">
              01
            </button>
            <button className="flex items-center  active:scale-95 transition-all hover:bg-neutral-200  h-full justify-center">
              <Minus className="stroke-[3] w-8" />
            </button>
          </div>
          <Button className="flex-grow hover:bg-green-400 active:scale-95 text-black transition-all h-[50px]  bg-green-400/70 text-lg font-semibold">
            Add to cart
          </Button>
        </div>
        <div className="flex mt-2 items-center gap-2">
          <Button className="h-[50px]  text-lg  active:scale-95 transition-all w-full  flex-grow">
            Buy now
          </Button>
          <button className="flex rounded-md active:scale-95 transition-all w-[60px] h-[50px] border items-center border-black/40 justify-center  ">
            <Heart />
          </button>
        </div>
      </div>
    </div>
  );
}
