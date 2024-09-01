import { Minus, Plus, X } from "lucide-react";
import { useCartStore } from "@/global-stores/cartStore";
type CartItemProps = {
    product: {
        promotion?: {
            isDiscounted: boolean;
            discountPercentage: string;
            discountedPrice: number;
        };
        id: number;
        name: string;
        price: number;
        quantity: number;
        image: string;
    };
};

export default function CartItem({ product }: CartItemProps) {
    const { setProducts, products } = useCartStore();

    const handleIncreaseQuantity = () => {
        const updatedProducts = products.map((p) =>
            p.name === product.name ? { ...p, quantity: p.quantity + 1 } : p
        );
        setProducts(updatedProducts);
    };

    const handleDecreaseQuantity = () => {
        const updatedProducts = products.map((p) =>
            p.name === product.name && p.quantity > 1
                ? { ...p, quantity: p.quantity - 1 }
                : p
        );
        setProducts(updatedProducts);
    };
    const handleRemoveProduct = () => {
        const updatedProducts = products.filter((p) => p.id !== product.id);
        setProducts(updatedProducts);
    };

    return (
        <div className="h-[110px] py-2 flex relative border bg-neutral-50 rounded">
            <div
                className="min-w-[70px] w-[70px] my-auto ml-3 h-[70px] bg-neutral-300 rounded-lg"
                style={{
                    backgroundImage: `url(${product.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></div>
            <div className="flex-grow ml-2 flex flex-col">
                <p className=" line-clamp-2  text-left font-semibold pr-5">
                    {product.name}
                </p>
                <div className="w-[90px]   mt-auto grid grid-cols-3">
                    <button
                        className="h-7 active:scale-95 transition-all bg-black flex items-center justify-center text-white text-xl font-semibold rounded"
                        onClick={handleDecreaseQuantity}
                    >
                        <Minus className="w-4 stroke-[2.4] h-4" />
                    </button>
                    <span className="flex items-center justify-center font-medium">
                        {product.quantity}
                    </span>
                    <button
                        className="h-7 active:scale-95 transition-all bg-black flex items-center justify-center text-white text-xl font-semibold rounded"
                        onClick={handleIncreaseQuantity}
                    >
                        <Plus className="w-4 stroke-[2.4] h-4" />
                    </button>
                </div>
                <button
                    className="h-7 absolute top-1 right-2 active:scale-95 transition-all text-black flex items-center justify-center  text-xl font-semibold rounded"
                    onClick={handleRemoveProduct}
                >
                    <X className="w-4 stroke-[2.4] h-4" />
                </button>
            </div>
            {product.promotion?.isDiscounted ? (
                <div className="absolute right-3 flex items-center gap-2 bottom-3">
                    <p className=" font-semibold opacity-50 scale-95 mt-px line-through">
                        {(product.price * product.quantity).toFixed(2)}
                    </p>
                    <p className=" font-semibold text-red-600">
                        {(
                            product.promotion.discountedPrice * product.quantity
                        ).toFixed(2)}
                        $
                    </p>
                </div>
            ) : (
                <p className="absolute right-3 bottom-3 font-semibold">
                    {(product.price * product.quantity).toFixed(2)}$
                </p>
            )}
        </div>
    );
}
