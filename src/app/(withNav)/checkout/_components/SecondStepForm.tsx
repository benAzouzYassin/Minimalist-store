import LoadingButton from "@/components/shared/LoadingButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { useCartStore } from "@/global-stores/cartStore";
import { apiBase } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
    name: string;
    prename?: string;
    address: string;
    zipcode: string;
};

type Props = {
    handleFailure: () => void;
};

export default function SecondStepForm(props: Props) {
    const [phone, setPhone] = useState("");
    const [phoneErr, setPhoneErr] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const products = useCartStore((s) => s.products);
    const coupon = useCartStore((s) => s.coupon);
    const resetCart = useCartStore((s) => s.reset);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();
    const router = useRouter();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        if (!phone) {
            return setPhoneErr("Phone is required.");
        } else {
            setIsLoading(true);
            const payload = {
                ...data,
                phone,
                products: products?.map((p) => ({
                    id: p.id,
                    quantity: p.quantity,
                })),
                couponId: coupon?.id,
            };
            apiBase
                .post("/orders/create", payload)
                .then(() => {
                    resetCart();
                    router.replace("/checkout/success");
                })
                .catch((err) => {
                    console.error(err);
                    props.handleFailure();
                });
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-lg md:max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="name" className="text-[16px] block mb-1">
                        Name
                        <span className="text-red-500 pt-1 text-lg font-bold">
                            *
                        </span>
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Name"
                        className="h-[50px] w-full"
                        {...register("name", { required: "Name is required" })}
                    />
                    <p
                        className={cn(
                            "text-red-500 font-medium h-5 italic opacity-0",
                            {
                                "opacity-100": errors.name?.message,
                            }
                        )}
                    >
                        {errors.name?.message}
                    </p>
                </div>
                <div>
                    <Label htmlFor="prename" className="text-[16px] block mb-1">
                        Prename
                    </Label>
                    <Input
                        id="prename"
                        type="text"
                        className="h-[50px] w-full"
                        placeholder="Prename"
                        {...register("prename")}
                    />
                </div>
            </div>
            <div className="mt-4">
                <Label htmlFor="phone" className="text-[16px] block mb-1">
                    Phone number
                    <span className="text-red-500 font-bold">*</span>
                </Label>
                <PhoneInput
                    id="phone"
                    className="h-[50px] rounded w-full"
                    placeholder="Phone number"
                    onChange={(value) => {
                        if (value) {
                            setPhone(value);
                            setPhoneErr("");
                        } else {
                            setPhone(value);
                            setPhoneErr("Phone number is required");
                        }
                    }}
                    defaultCountry="TN"
                />
                <p
                    className={cn(
                        "text-red-400 font-medium h-5 italic opacity-0",
                        {
                            "opacity-100": phoneErr,
                        }
                    )}
                >
                    {phoneErr}
                </p>
            </div>
            <div className="mt-4">
                <Label htmlFor="address" className="text-[16px] block mb-1">
                    Address<span className="text-red-500 font-bold">*</span>
                </Label>
                <Input
                    id="address"
                    type="text"
                    className="h-[50px] w-full"
                    placeholder="Address"
                    {...register("address", {
                        required: "Address is required",
                    })}
                />
                <p
                    className={cn(
                        "text-red-500 font-medium h-5 italic opacity-0",
                        {
                            "opacity-100": errors?.address?.message,
                        }
                    )}
                >
                    {errors?.address?.message}
                </p>
            </div>
            <div className="mt-4">
                <Label className="text-[16px] block mb-1" htmlFor="zipcode">
                    Zip code<span className="text-red-500 font-bold">*</span>
                </Label>
                <Input
                    id="zipcode"
                    type="text"
                    placeholder="Zip code"
                    className="h-[50px] w-full"
                    {...register("zipcode", {
                        required: "Zip code is required",
                        pattern: {
                            value: /^[0-9]{4,6}$/,
                            message: "Enter a valid zip code",
                        },
                    })}
                />
                <p
                    className={cn(
                        "text-red-500 font-medium h-5 italic opacity-0",
                        {
                            "opacity-100": errors.zipcode?.message,
                        }
                    )}
                >
                    {errors.zipcode?.message}
                </p>
            </div>
            <LoadingButton
                isLoading={isLoading}
                className="mt-6 text-white active:scale-[98%] transition-all w-full h-[50px] bg-neutral-800 font-bold rounded"
            >
                Finish the order
            </LoadingButton>
        </form>
    );
}
