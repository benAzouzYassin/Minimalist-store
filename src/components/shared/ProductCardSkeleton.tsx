import { cn } from "@/lib/utils";

type Props = {
    className?: string;
};

export default function ProductCardSkeleton(props: Props) {
    return (
        <div
            className={cn(
                "border-2 flex group py-2 overflow-hidden active:scale-95 hover:cursor-pointer flex-col px-4 relative  w-[250px] h-[350px] transition-transform rounded",
                props.className
            )}>
            <div className="bg-neutral-300 animate-pulse h-[70%] rounded-md mt-3"></div>
            <div>
                <p className="pt-2 rounded-md h-7 bg-neutral-300 mt-2 w-[60%]  animate-pulse line-clamp-2 font-medium "></p>
                <p className="font-bold text-[18px] h-5 bg-neutral-300 animate-pulse absolute rounded-md bottom-4 w-16"></p>
            </div>
        </div>
    );
}
