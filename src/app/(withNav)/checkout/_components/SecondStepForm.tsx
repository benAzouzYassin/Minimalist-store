import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FormValues {
    name: string;
    prename?: string;
    address: string;
    zipcode: string;
}

export default function SecondStepForm() {
    const [phone, setPhone] = useState("");
    const [phoneErr, setPhoneErr] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        if (!phone) {
            return setPhoneErr("Phone is required.");
        } else {
            console.log({ ...data, phone });
        }

        // Handle form submission logic here
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
            <Button
                type="submit"
                className="mt-4  active:scale-[98%] transition-all w-full h-[50px] bg-neutral-800 text-white font-bold rounded"
            >
                Complete the order
            </Button>
        </form>
    );
}