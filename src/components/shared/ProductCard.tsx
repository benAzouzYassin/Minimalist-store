import { cn } from "@/lib/utils";
import Link from "next/link";
import { CSSProperties, useState } from "react";

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
    const [isLoading, setIsLoading] = useState(true);

    if (isLoading)
        return (
            <div
                className={cn(
                    "border-2 flex group py-2 overflow-hidden active:scale-95 hover:cursor-pointer flex-col px-4 relative  w-[250px] h-[350px] transition-transform rounded",
                    props.className
                )}>
                <div className="bg-neutral-300 animate-pulse h-[70%] rounded-md mt-3">
                    <img
                        src={props.image}
                        className="opacity-0"
                        alt=""
                        onLoad={() => setIsLoading(false)}
                    />
                </div>
                <div>
                    <p className="pt-2 rounded-md h-7 bg-neutral-300 mt-2 w-[60%]  animate-pulse line-clamp-2 font-medium "></p>
                    <p className="font-bold text-[18px] h-5 bg-neutral-300 animate-pulse absolute rounded-md bottom-4 w-16"></p>
                </div>
            </div>
        );
    return (
        <Link
            style={props.style}
            href={`/products/${props.id}`}
            className={cn(
                "border-2 flex group py-2 overflow-hidden active:scale-95 hover:cursor-pointer flex-col px-4 relative  w-[250px] h-[350px] transition-transform rounded",
                props.className
            )}>
            <img
                src={props.image}
                className="h-[70%] group-hover:scale-110 transition-transform duration-300 w-full object-contain"
                alt=""
            />
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
