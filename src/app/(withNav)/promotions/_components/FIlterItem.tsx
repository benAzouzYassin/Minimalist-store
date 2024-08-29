import { Input } from "@/components/ui/input";
import { useState } from "react";

type Props = {
    handleSelect?: () => void;
    handleUnSelect?: () => void;
    text: string;
};
export default function FilterItem(props: Props) {
    const [isActive, setIsActive] = useState(false);
    return (
        <div className="flex pl-2 mt-3 gap-2 items-center justify-start">
            <Input
                checked={isActive}
                onClick={() => {
                    if (!isActive) {
                        props.handleSelect?.();
                        setIsActive(true);
                    } else {
                        props.handleUnSelect?.();
                        setIsActive(false);
                    }
                }}
                className="w-4 h-4 rounded-none accent-neutral-500"
                type="checkbox"
                id={props.text}
            />{" "}
            <label className="font-medium opacity-70 " htmlFor={props.text}>
                {props.text}
            </label>
        </div>
    );
}
