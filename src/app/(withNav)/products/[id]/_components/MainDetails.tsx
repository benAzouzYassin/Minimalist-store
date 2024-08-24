"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "iconsax-react";
import { Minus, Plus } from "lucide-react";
import { Product } from "../page";
import ProductImages from "./ProductImages";
import { useCartStore } from "@/global-stores/cartStore";
import { useRouter } from "next/navigation";

type Props = {
    product: Product;
};

export default function MainDetails({ product }: Props) {
    const router = useRouter();
    const {
        products: cartProducts,
        setProducts: setCartProducts,
        setIsOpen,
    } = useCartStore();
    const [quantity, setQuantity] = useState(1);

    const addProductToCart = () => {
        const existingProductIndex = cartProducts.findIndex(
            (p) => p.id === product.id
        );
        const updatedProducts = [...cartProducts];
        if (existingProductIndex >= 0) {
            updatedProducts[existingProductIndex].quantity += quantity;
        } else {
            updatedProducts.push({
                promotion: product.promotion,
                id: product.id,
                image: product.imageURL,
                name: product.name,
                price: Number(product.price),
                quantity: quantity,
            });
        }

        setCartProducts(updatedProducts);
    };
    const handleAddToCart = () => {
        addProductToCart();
        setIsOpen(true);
    };

    const handleByNow = () => {
        addProductToCart();
        router.push("/checkout");
    };

    const handleIncreaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecreaseQuantity = () => {
        setQuantity((prevQuantity) =>
            prevQuantity > 1 ? prevQuantity - 1 : prevQuantity
        );
    };

    return (
        <div className="grid grid-cols-2 gap-4  3xl:px-[250px] px-[200px] pt-10 ">
            <div className=" max-w-[560px] ml-auto">
                <ProductImages
                    mainImage={product.imageURL}
                    otherImages={product.otherImages}
                />
            </div>

            <div className="bg-neutral-100 relative max-w-[650px] rounded-2xl pt-5 px-8">
                {product.promotion?.isDiscounted && (
                    <span className="bg-red-600/90 flex items-center justify-center z-50 text-sm font-semibold top-14  right-0 px-2 py-[7px]  rounded-r-none rounded-l-md text-white absolute">
                        SAVE {product.promotion.discountPercentage}
                    </span>
                )}
                <h1 className="text-3xl font-bold max-w-[90%] line-clamp-2">
                    {product.name}
                </h1>
                <p className="font-medium text-sm opacity-50">
                    Reference: {product.reference}
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
                {product.promotion?.isDiscounted ? (
                    <div className="flex items-center gap-3">
                        <p className="text-[28px] mt-3 line-through opacity-40 mb-1 font-semibold ">
                            {Number(product.price).toFixed(2)}
                        </p>
                        <p className="text-[28px] text-red-600 mt-3 mb-1 font-bold  ">
                            {Number(
                                product?.promotion?.discountedPrice
                            ).toFixed(2)}
                            $
                        </p>
                    </div>
                ) : (
                    <p className="text-[28px] mt-3 mb-1 font-bold opacity-90 ">
                        {Number(product.price).toFixed(2)}$
                    </p>
                )}
                <p className="text-black/60 font-medium mt-2 ">
                    The rounded square design of the toaster allows it to fit
                    neatly against a wall, or inside a corner. Excellent at
                    defrosting, and with the perfect bread-to-heater distance to
                    give crunchy toast with a soft, spongy middle.
                </p>
                <div className=" mt-20 flex  gap-2 ">
                    <div className="border grid grid-cols-3 h-[50px] justify-center items-center w-[150px] overflow-hidden border-black rounded-xl font-bold">
                        <button
                            onClick={handleDecreaseQuantity}
                            className="flex items-center active:scale-95 transition-all hover:bg-neutral-200 h-full justify-center"
                        >
                            <Minus className="stroke-[3] w-8" />
                        </button>
                        <span className="flex items-center justify-center text-lg">
                            {quantity.toString().padStart(2, "0")}
                        </span>
                        <button
                            onClick={handleIncreaseQuantity}
                            className="flex items-center active:scale-95 transition-all hover:bg-neutral-200 h-full justify-center"
                        >
                            <Plus className="stroke-[2.5]" />
                        </button>
                    </div>
                    <Button
                        onClick={handleAddToCart}
                        className="flex-grow hover:bg-green-400 active:scale-95 text-black transition-all h-[50px] bg-green-400/70 text-lg font-semibold"
                    >
                        Add to cart
                    </Button>
                </div>
                <div className="flex mt-2 items-center gap-2">
                    <Button
                        onClick={handleByNow}
                        className="h-[50px] text-lg active:scale-95 transition-all w-full flex-grow"
                    >
                        Buy now
                    </Button>
                    <button className="flex rounded-md active:scale-95 transition-all w-[60px] h-[50px] border items-center border-black/40 justify-center">
                        <Heart />
                    </button>
                </div>
            </div>
        </div>
    );
}
