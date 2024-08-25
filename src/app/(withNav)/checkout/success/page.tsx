"use client";
import { useCartStore } from "@/global-stores/cartStore";
import { Check } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function SuccessPage() {
    const setProducts = useCartStore((s) => s.setProducts);
    useEffect(() => {
        setProducts([]);
    }, []);
    return (
        <div className="min-h-screen px-10 flex flex-col">
            <div className="relative mt-16 mx-auto w-full max-w-3xl">
                <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-green-500 mt-28 mx-auto text-white flex items-center justify-center rounded-full">
                        <Check className="w-14 h-14" />
                    </div>
                    <h1 className="text-4xl font-bold pt-5">
                        Your order was successful!
                    </h1>
                    <p className="text-gray-500 text-md pt-2 mb-2">
                        Thank you for your order! We&apos;ll contact you soon to
                        complete it.
                    </p>
                    <div className="flex active:scale-95 transition-all justify-center mt-5">
                        <Link href="/">
                            <p className="bg-stone-800 text-white py-2 active:scale-95 transition-all px-4 rounded font-medium hover:bg-stone-700">
                                Continue shopping
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
