"use client";
import { useCartStore } from "@/global-stores/cartStore";
import { useEffect, useState } from "react";
import SecondStepForm from "./SecondStepForm";

export default function SecondStep() {
    const products = useCartStore((s) => s.products);
    const [subtotal, setSubtotal] = useState(0);
    const deliveryFee = 7;

    useEffect(() => {
        const calculateSubtotal = () => {
            const total = products.reduce((acc, p) => {
                if (p.promotion?.isDiscounted) {
                    return acc + p.promotion.discountedPrice * p.quantity;
                } else {
                    return acc + p.price * p.quantity;
                }
            }, 0);
            setSubtotal(total);
        };

        calculateSubtotal();
    }, [products]);

    const total = subtotal + deliveryFee;

    return (
        <section className="w-[1200px] pb-20 min-h-[700px]  h-fit mt-10  flex ">
            <div className="flex-grow max-w-[1000px] mx-auto h-fit">
                <SecondStepForm />
            </div>
        </section>
    );
}
