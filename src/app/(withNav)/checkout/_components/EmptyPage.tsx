import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function EmptyPage() {
    return (
        <section className="min-h-screen">
            <section className="pt-44">
                <img
                    alt=""
                    src="/assets/empty-cart.png"
                    className="w-[180px] -translate-x- h-[180px] mx-auto"
                />
                <div className="flex justify-center w-full flex-col">
                    <p className="w-full text-center font-semibold opacity-60  mt-2 mx-auto">
                        <span className="text-4xl font-bold">
                            Cart is empty
                        </span>{" "}
                        <br />
                        <span className="text-gray-600">
                            {" "}
                            please select products then comeback.
                        </span>
                    </p>
                    <Link href={"/products"} className="mx-auto">
                        <Button className=" active:scale-95 transition-transform mt-4  w-[150px] font-semibold bg-stone-800">
                            All Products
                        </Button>
                    </Link>
                </div>
            </section>
        </section>
    );
}
