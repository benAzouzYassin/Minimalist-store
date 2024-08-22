"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { CSSProperties, Suspense, useState } from "react";

// TODO make the isDiscounted property when promotions module is ready
type Props = {
    id: number;
    image: string;
    price: string;
    //   isDiscounted: boolean;
    name: string;

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
                "border-2 flex group py-2 overflow-hidden active:scale-95 hover:cursor-pointer flex-col px-4 relative  w-[250px] h-[350px] transition-transform rounded",
                props.className
            )}
        >
            <Suspense
                fallback={
                    <div
                        className={
                            "bg-neutral-300 h-[65%] animate-pulse rounded-md mt-3 w-full"
                        }
                    >
                        aaaaaaaaaa
                    </div>
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
                <p className="font-bold text-[18px] absolute bottom-4">
                    ${props.price}
                </p>
            </div>
        </Link>
    );
}
