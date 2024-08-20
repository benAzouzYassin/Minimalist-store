import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterItem from "./FIlterItem";
import PriceLimitFilter from "./PriceLimiter";
import { useEffect, useState } from "react";
type Props = {
    categories: string[];
};
export default function Filters({ categories }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect(() => {
        if (selectedCategories.length > 0) {
            const params = new URLSearchParams();
            selectedCategories.forEach((c) => params.append("category", c));
            router.push(pathname + "?" + params.toString());
        }
    }, [selectedCategories]);

    return (
        <section className="min-w-[300px] pt-10  rounded h-fit border-2 px-4 min-h-[400px]">
            <PriceLimitFilter />
            <div className="pb-5">
                <p className="text-xl mt-5 font-semibold">Categories</p>
                {categories.map((c) => (
                    <FilterItem
                        handleSelect={() =>
                            setSelectedCategories([...selectedCategories, c])
                        }
                        handleUnSelect={() =>
                            setSelectedCategories(
                                selectedCategories.filter((item) => item !== c)
                            )
                        }
                        text={c}
                        key={c}
                    />
                ))}
            </div>
        </section>
    );
}
