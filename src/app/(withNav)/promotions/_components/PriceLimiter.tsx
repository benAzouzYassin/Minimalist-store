import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useStore } from "../store";

export default function PriceLimiter() {
    const priceLimit = useStore((s) => s.priceLimit);
    const setPriceLimit = useStore((s) => s.setPriceLimit);
    const priceMinimum = useStore((s) => s.priceMinimum);
    const setPriceMinimum = useStore((s) => s.setPriceMinimum);
    return (
        <div className="border-b-2 pb-5">
            <p className=" text-xl mt-2 font-semibold">Limiter le prix</p>
            <Slider
                defaultValue={[0, 1000]}
                max={5000}
                min={0}
                step={1}
                onValueChange={([min, max]) => {
                    setPriceLimit(max);
                    setPriceMinimum(min);
                }}
                className={cn("w-full  mt-4 bg-neutral-200 h-2")}
            />
            <div className="flex mt-3 items-end">
                <span className="text-lg font-semibold text-black/50">
                    Price :{" "}
                    <span className="text-black text-sm">
                        {priceMinimum} - {priceLimit}
                    </span>
                </span>

                <Button className="ml-auto h-[35px]">Filtrer</Button>
            </div>
        </div>
    );
}
