"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { CSSProperties, Suspense, useState } from "react";

type Props = {
    id: number;
    image: string;
    price: string;
    name: string;
    promotion?: {
        isDiscounted: boolean;
        discountPercentage: string;
        discountedPrice: number;
    };
    isSoldOut: boolean;
    className?: string;
    style?: CSSProperties;
};

export default function ProductCard(props: Props) {
    return (
        <Link
            style={props.style}
            href={`/products/${props.id}`}
            className={cn(
                "border-2 flex group py-2 overflow-hidden active:scale-95 relative hover:cursor-pointer flex-col px-4  w-[250px] h-[350px] transition-transform rounded",
                props.className
            )}
        >
            {props.promotion?.isDiscounted && (
                <span className="bg-stone-700 flex items-center justify-center z-50 text-xs font-semibold top-3  right-0 px-2 py-[7px]  rounded-r-none rounded-l-md text-white absolute">
                    SAVE {props.promotion.discountPercentage}
                </span>
            )}
            <Suspense
                fallback={
                    <div
                        className={
                            "bg-neutral-300 h-[65%] animate-pulse rounded-md mt-3 w-full"
                        }
                    ></div>
                }
            >
                <img
                    src={props.image}
                    className="h-[65%] group-hover:scale-110 transition-transform duration-300 w-full object-contain"
                    alt=""
                />
            </Suspense>
            <div>
                <p className="pt-2 line-clamp-2 font-medium mt-auto">
                    {props.name}
                </p>
                {props.promotion?.isDiscounted ? (
                    <div className="flex items-center gap-2 absolute bottom-4">
                        <p className="font-semibold  line-through opacity-50 text-[18px] ">
                            {props.price}
                        </p>
                        <p className="font-bold text-[18px] text-red-600/90 ">
                            ${props.promotion.discountedPrice}
                        </p>
                    </div>
                ) : (
                    <p className="font-semibold text-[18px] absolute bottom-4">
                        ${props.price}
                    </p>
                )}
            </div>
        </Link>
    );
}
