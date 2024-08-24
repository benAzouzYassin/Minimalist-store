import LoadingButton from "@/components/shared/LoadingButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { useCartStore } from "@/global-stores/cartStore";
import { apiBase } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
    name: string;
    prename?: string;
    address: string;
    zipcode: string;
}

export default function SecondStepForm() {
    const [phone, setPhone] = useState("");
    const [phoneErr, setPhoneErr] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const products = useCartStore((s) => s.products);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        if (!phone) {
            return setPhoneErr("Phone is required.");
        } else {
            const payload = {
                ...data,
                phone,
                productsIds: products?.map((p) => p.id),
            };
            console.log(payload);
            apiBase
                .post("/api/orders/create", payload)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => console.error(err));
            setIsLoading(true);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="h-fit pr-8 ">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="name" className="text-[16px] block mb-px">
                        Name
                        <span className="text-red-500 pt-1 text-lg font-bold">
                            *
                        </span>
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Name"
                        className="h-[50px] "
                        {...register("name", { required: "Name is required" })}
                    />
                    <p
                        className={cn(
                            "text-red-500 font-medium h-5  italic  opacity-0",
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
                        className="h-[50px] "
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
                    className="h-[50px] rounded"
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
                        "text-red-400 font-medium h-5  italic  opacity-0",
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
                    className="h-[50px] "
                    placeholder="Address"
                    {...register("address", {
                        required: "Address is required",
                    })}
                />
                <p
                    className={cn(
                        "text-red-500 font-medium h-5  italic  opacity-0",
                        {
                            "opacity-100": errors?.address?.message,
                        }
                    )}
                >
                    {errors?.address?.message}
                </p>
            </div>
            <div className="mt-2">
                <Label className="text-[16px] block mb-1" htmlFor="zipcode">
                    Zip code<span className="text-red-500 font-bold">*</span>
                </Label>
                <Input
                    id="zipcode"
                    type="text"
                    placeholder="Zip code"
                    className="h-[50px] "
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
                        "text-red-500 font-medium h-5  italic  opacity-0",
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
                // type="submit"
                className="mt-4 text-white  active:scale-[98%] transition-all w-full h-[50px] bg-neutral-800  font-bold rounded"
            >
                Finish the order
            </LoadingButton>
        </form>
    );
}
