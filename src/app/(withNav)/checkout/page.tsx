"use client";
import { useCartStore } from "@/global-stores/cartStore";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import EmptyPage from "./_components/EmptyPage";
import FirstStep from "./_components/FirstStep";
import SecondStep from "./_components/SecondStep";

export default function Page() {
    const [currentStep, setCurrentStep] = useState<
        "verification" | "information" | "success"
    >("verification");
    const { products } = useCartStore();
    const [subtotal, setSubtotal] = useState(0);
    const deliveryFee = 7;

    useEffect(() => {
        const calculateSubtotal = () => {
            const total = products.reduce((acc, product) => {
                if (product.promotion?.isDiscounted) {
                    return (
                        acc +
                        product.promotion.discountedPrice * product.quantity
                    );
                } else {
                    return acc + product.price * product.quantity;
                }
            }, 0);
            setSubtotal(total);
        };

        calculateSubtotal();
    }, [products]);

    const total = subtotal + deliveryFee;
    if (products.length < 1) {
        return <EmptyPage />;
    }
    return (
        <section className="min-h-screen flex flex-col items-center">
            <h1 className="font-bold text-4xl pt-20 text-center">Checkout</h1>
            <section className="max-w-[1000px] mt-12 w-full mx-auto">
                <section className="grid gap-16 grid-cols-3">
                    <div
                        onClick={() => setCurrentStep("verification")}
                        className={cn(
                            " flex relative group active:scale-[98%] opacity-30 hover:cursor-pointer hover:opacity-70 transition-all items-center flex-row w-full",
                            {
                                "opacity-100 hover:opacity-100":
                                    currentStep === "verification",
                            }
                        )}
                    >
                        <div className="pb-3 flex font-medium text-xl">
                            <span className="w-9 h-9 flex items-center justify-center rounded-full text-lg font-semibold bg-black/80 text-white">
                                1
                            </span>
                            <div className="mt-auto uppercase mb-1 ml-3 text-[20px] font-bold">
                                Verify products
                            </div>
                            <div className="h-[2px] bg-black group-hover:w-full transition-all absolute left-1 bottom-0 w-0 opacity-100"></div>
                            <div className="h-[2px] bg-black w-full absolute left-1 bottom-0"></div>
                        </div>
                    </div>
                    <div
                        onClick={() => setCurrentStep("information")}
                        className={cn(
                            "flex relative group active:scale-[98%] opacity-30 hover:cursor-pointer hover:opacity-70 transition-all items-center flex-row w-full",
                            {
                                "opacity-100 hover:opacity-100":
                                    currentStep === "information",
                            }
                        )}
                    >
                        <div className="pb-3 flex font-medium text-xl">
                            <span className="w-9 h-9 flex items-center justify-center rounded-full text-lg font-semibold bg-black/80 text-white">
                                2
                            </span>
                            <div className="mt-auto  uppercase mb-1 ml-3 text-[20px] font-bold">
                                Delivery information
                            </div>
                            <div className="h-[2px] bg-black w-full absolute left-1 bottom-0 opacity-30"></div>
                            <div className="h-[2px] bg-black group-hover:w-full transition-all absolute left-1 bottom-0 w-0 opacity-100"></div>
                        </div>
                    </div>
                    <div className="flex hover:cursor-not-allowed relative opacity-30 items-center flex-row w-full">
                        <div className="pb-3 flex font-medium text-xl">
                            <span className="w-9 h-9 flex items-center justify-center rounded-full text-lg font-semibold bg-black/80 text-white">
                                3
                            </span>
                            <div className="mt-auto uppercase mb-1 ml-3 text-[20px] font-bold">
                                Payment & success
                            </div>
                            <div className="h-[2px] bg-black w-full absolute left-1 bottom-0"></div>
                        </div>
                    </div>
                </section>
            </section>
            <div className="flex h-[100vh] transition-all w-full ">
                <div
                    className={cn(
                        " w-[1200px] transition-all   duration-500 ease-out absolute left-1/2 -translate-x-1/2 mx-auto",
                        {
                            "flex absolute w-[1200px] opacity-0 mx-auto left-0 -translate-x-[100%]":
                                currentStep != "verification",
                        }
                    )}
                >
                    <FirstStep setCurrentStep={setCurrentStep} />
                </div>
                <div
                    className={cn(
                        " w-[1200px]  transition-all duration-500 ease-out  absolute left-1/2 -translate-x-1/2 mx-auto",
                        {
                            "flex absolute w-[1200px] opacity-0 mx-auto right-0 translate-x-[100%]":
                                currentStep != "information",
                        }
                    )}
                >
                    <SecondStep />
                </div>
            </div>
        </section>
    );
}
