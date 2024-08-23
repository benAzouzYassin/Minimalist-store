"use client";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/global-stores/cartStore";
import { useEffect, useState } from "react";
import SecondStepForm from "./SecondStepForm";

export default function SecondStep() {
    const products = useCartStore((s) => s.products);
    const [subtotal, setSubtotal] = useState(0);
    const deliveryFee = 7;

    useEffect(() => {
        const calculateSubtotal = () => {
            const total = products.reduce(
                (acc, p) => acc + p.price * p.quantity,
                0
            );
            setSubtotal(total);
        };

        calculateSubtotal();
    }, [products]);

    const total = subtotal + deliveryFee;

    return (
        <section className="w-[1200px] pb-20 min-h-[700px]  h-fit mt-16  flex ">
            <div className="flex-grow h-fit">
                <SecondStepForm />
            </div>
            <div className="w-[350px] h-fit px-8 py-6 border border-black/10 rounded-2xl shadow-[0px_0px_10px] shadow-black/10 ">
                <p className="text-xl uppercase border-b-2  border-black/50 pb-1 text-black/90 font-bold">
                    Order Details
                </p>
                <div className="mt-2">
                    {products.map((p) => (
                        <div key={p.id} className="flex">
                            <img
                                alt=""
                                src={p.image}
                                className="min-w-[60px] w-[60px] min-h-[60px] h-[60px] rounded-md border"
                            />
                            <div className="h-[70px]  ">
                                <p className="line-clamp-1 pr-4 ml-3 font-bold ">
                                    {p.name}
                                </p>
                                <span className="ml-3 font-semibold mt-2 flex items-center gap-1">
                                    <span>{p.quantity}</span> x
                                    <span className="">{p.price}</span>
                                    <span>=</span>
                                    <span className="font-bold text-[#292c43]">
                                        {p.quantity * p.price}
                                    </span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="font-bold mt-5 text-neutral-800  flex items-center">
                    Sub-total{" "}
                    <span className="font-bold text-lg opacity-80 ml-auto">
                        {subtotal}$
                    </span>
                </p>
                <p className="font-bold text-neutral-800   mt-3 flex items-center">
                    Delivery
                    <span className="font-bold text-lg opacity-80 ml-auto">
                        {deliveryFee}$
                    </span>
                </p>
                <p className="border-t-2 mt-4 pt-3 font-bold text-neutral-800  border-black/50 text-xl flex items-center">
                    Total{" "}
                    <span className="font-bold text-2xl opacity-80 ml-auto">
                        {total}$
                    </span>
                </p>
            </div>
        </section>
    );
}
