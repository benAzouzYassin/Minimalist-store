"use client";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/global-stores/cartStore";
import { Minus, Plus, Trash } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
    setCurrentStep: Dispatch<
        SetStateAction<"verification" | "information" | "success">
    >;
};
export default function FirstStep(props: Props) {
    const { products } = useCartStore();
    const [subtotal, setSubtotal] = useState(0);
    const deliveryFee = 7;

    useEffect(() => {
        const calculateSubtotal = () => {
            const total = products.reduce(
                (acc, product) => acc + product.price * product.quantity,
                0
            );
            setSubtotal(total);
        };

        calculateSubtotal();
    }, [products]);

    const total = subtotal + deliveryFee;
    return (
        <section className="flex relative w-[1200px] mt-10">
            <ProductsTable />
            <div className="flex-grow absolute w-[30%] py-5 px-5 -right-5 rounded-2xl shadow-[0px_0px_10px] shadow-black/10 pb-5 border">
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
        <table className="w-[70%] bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Product</th>
                    <th className="py-3 px-6 text-center">Price</th>
                    <th className="py-3 px-6 text-center">Quantity</th>
                    <th className="py-3 px-6 text-center">Total</th>
                    <th className="py-3 px-6 text-center">Action</th>
                </tr>
            </thead>
            <tbody className="text-gray-600 font-semibold">
                {products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-200">
                        <td className="py-3 pl-3 text-left max-w-[300px] flex items-center">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-16 border rounded-md h-16 object-cover mr-4"
                            />
                            <span className="line-clamp-2">{product.name}</span>
                        </td>
                        <td className="py-3 px-3 text-center">
                            ${Number(product.price).toFixed(2)}
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
                                <span className="px-3">{product.quantity}</span>
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
                            ${(product.price * product.quantity).toFixed(2)}
                        </td>
                        <td className="py-3 px-2 text-center">
                            <button
                                onClick={() => handleRemoveProduct(product.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <Trash className="w-4 h-4" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
