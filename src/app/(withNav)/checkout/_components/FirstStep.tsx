"use client";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/global-stores/cartStore";
import { Minus, Plus, Trash } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Coupon from "./Coupon";

type Props = {
    setCurrentStep: Dispatch<
        SetStateAction<"verification" | "information" | "success">
    >;
};

export default function FirstStep(props: Props) {
    const { products, coupon } = useCartStore();
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
            if (!coupon) {
                setSubtotal(total);
            } else {
                if (!coupon.usageLeft) {
                    return setSubtotal(total);
                }
                const couponStartDate = new Date(coupon.startDate);
                const couponEndDate = new Date(coupon.endDate);
                const now = new Date();
                const couponPercentage = Number(coupon.percentage) || 0;
                const isValidCoupon =
                    now > couponStartDate && now <= couponEndDate;
                const subTotalAfterCoupon = isValidCoupon
                    ? total - total * (couponPercentage / 100)
                    : total;
                setSubtotal(subTotalAfterCoupon);
            }
        };

        calculateSubtotal();
    }, [products, coupon]);

    const total = subtotal + deliveryFee;

    return (
        <section className="flex flex-col lg:flex-row  relative w-full max-w-[1200px] mt-10 px-4 lg:px-0">
            <ProductsTable />
            <div className="lg:flex-grow lg:absolute lg:-right-5 w-full lg:w-[30%] mt-8 lg:mt-0">
                <div className="py-5 px-5 rounded-2xl shadow-[0px_0px_10px] shadow-black/10 pb-5 border">
                    <p className="text-2xl font-bold">Cart Summary</p>
                    <p className="flex uppercase items-center font-bold text-black/60 mt-5">
                        Subtotal
                        <span className="ml-auto text-black font-bold text-sm">
                            ${subtotal.toFixed(2)}
                        </span>
                    </p>
                    <p className="flex uppercase items-center font-bold text-black/60 mt-3 mb-3">
                        Delivery
                        <span className="ml-auto text-black font-bold text-sm">
                            ${deliveryFee.toFixed(2)}
                        </span>
                    </p>
                    <p className="flex uppercase items-center border-t-2 border-black/30 font-bold text-black/80 mt-3 pt-4 text-xl">
                        Total
                        <span className="ml-auto font-bold text-[16px]">
                            ${total.toFixed(2)}
                        </span>
                    </p>
                    <Button
                        onClick={() => props.setCurrentStep("information")}
                        className="w-full mt-8 active:scale-95 transition-all"
                    >
                        Verify Purchase
                    </Button>
                </div>
                <Coupon />
            </div>
        </section>
    );
}

function ProductsTable() {
    const { products, setProducts } = useCartStore();

    const handleIncreaseQuantity = (productId: number) => {
        const updatedProducts = products.map((product) =>
            product.id === productId
                ? { ...product, quantity: product.quantity + 1 }
                : product
        );
        setProducts(updatedProducts);
    };

    const handleDecreaseQuantity = (productId: number) => {
        const updatedProducts = products.map((product) =>
            product.id === productId && product.quantity > 1
                ? { ...product, quantity: product.quantity - 1 }
                : product
        );
        setProducts(updatedProducts);
    };

    const handleRemoveProduct = (productId: number) => {
        const updatedProducts = products.filter(
            (product) => product.id !== productId
        );
        setProducts(updatedProducts);
    };

    return (
        <div className="w-full lg:w-[70%] overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <tr>
                        <th className="py-3 px-6 text-left">Product</th>
                        <th className="py-3 px-6 text-center">Price</th>
                        <th className="py-3 px-6 text-center">Quantity</th>
                        <th className="py-3 px-6 text-center">Total</th>
                        <th className="py-3 px-6 text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 font-semibold">
                    {products.map((product) => (
                        <tr
                            key={product.id}
                            className="border-b border-gray-200"
                        >
                            <td className="py-3 pl-3 text-left max-w-[300px] flex items-center">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-16 border rounded-md h-16 object-cover mr-4"
                                />
                                <span className="line-clamp-2">
                                    {product.name}
                                </span>
                            </td>
                            <td className="py-3 px-3 text-center">
                                {product.promotion?.isDiscounted ? (
                                    <div>
                                        <p className="line-through opacity-50">
                                            ${Number(product.price).toFixed(2)}
                                        </p>
                                        <p className="text-red-500">
                                            $
                                            {Number(
                                                product.promotion
                                                    .discountedPrice
                                            ).toFixed(2)}
                                        </p>
                                    </div>
                                ) : (
                                    <p>${Number(product.price).toFixed(2)}</p>
                                )}
                            </td>
                            <td className="py-3 px-2 text-center">
                                <div className="flex justify-center items-center">
                                    <button
                                        onClick={() =>
                                            handleDecreaseQuantity(product.id)
                                        }
                                        className="p-2"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="px-3">
                                        {product.quantity}
                                    </span>
                                    <button
                                        onClick={() =>
                                            handleIncreaseQuantity(product.id)
                                        }
                                        className="p-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                            <td className="py-3 px-2 text-center">
                                {product.promotion?.isDiscounted ? (
                                    <div>
                                        <p className="line-through opacity-50">
                                            $
                                            {(
                                                product.price * product.quantity
                                            ).toFixed(2)}
                                        </p>
                                        <p className="text-red-500">
                                            $
                                            {(
                                                product.promotion
                                                    .discountedPrice *
                                                product.quantity
                                            ).toFixed(2)}
                                        </p>
                                    </div>
                                ) : (
                                    <p>
                                        $
                                        {(
                                            product.price * product.quantity
                                        ).toFixed(2)}
                                    </p>
                                )}
                            </td>
                            <td className="py-3 px-2 text-center">
                                <button
                                    onClick={() =>
                                        handleRemoveProduct(product.id)
                                    }
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
