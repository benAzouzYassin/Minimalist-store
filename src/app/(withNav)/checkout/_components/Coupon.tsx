import { useState } from "react";
import { useCartStore } from "@/global-stores/cartStore";
import { apiBase } from "@/lib/axios";
import LoadingButton from "@/components/shared/LoadingButton";
import { Input } from "@/components/ui/input";

export default function Coupon() {
    const [isLoading, setIsLoading] = useState(false);
    const [couponInput, setCouponInput] = useState("");
    const [isValid, setIsValid] = useState<boolean | null>(null);

    const setCouponData = useCartStore((s) => s.setCoupon);

    const handleSubmit = () => {
        setIsLoading(true);
        apiBase
            .get("/coupons/" + couponInput)
            .then((response) => {
                const data = response.data as CouponType;
                if (data.name) {
                    const startDate = new Date(data.startDate);
                    const endDate = new Date(data.endDate);
                    const now = new Date();
                    if (now > startDate && now <= endDate && data.usageLeft) {
                        setCouponData(data);
                        setIsValid(true);
                    } else {
                        setCouponData(null);
                        setIsValid(false);
                    }
                } else {
                    setCouponData(null);
                    setIsValid(false);
                }
            })
            .catch((err) => {
                setIsValid(false);
                setCouponData(null);
                console.error(err);
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
            className="mt-10 py-5 px-5 -right-5 rounded-2xl shadow-[0px_0px_10px] shadow-black/10 pb-5 border"
        >
            <p className="text-2xl font-bold mb-3">Coupon code</p>
            <div className="space-y-3">
                <Input
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter coupon code"
                />
                <LoadingButton
                    isLoading={isLoading}
                    className="active:scale-95 transition-all w-full"
                    onClick={handleSubmit}
                >
                    Apply coupon
                </LoadingButton>
                {isValid !== null && (
                    <p
                        className={`text-sm  ${
                            isValid
                                ? "text-green-500 font-semibold"
                                : "text-red-500 font-semibold"
                        }`}
                    >
                        {isValid
                            ? "Coupon applied successfully!"
                            : "Invalid or expired coupon code. Please try again."}
                    </p>
                )}
            </div>
        </form>
    );
}

type CouponType = {
    createdAt: string;
    endDate: string;
    id: number;
    name: string;
    percentage: string;
    startDate: string;
    updatedAt: string;
    usageLeft: number;
};
