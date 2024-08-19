import { cn } from "@/lib/utils";
import Link from "next/link";

// TODO make the isDiscounted property when promotions module is ready
type Props = {
  id: number;
  image: string;
  price: string;
  //   isDiscounted: boolean;
  name: string;

  isSoldOut: boolean;
  className?: string;
};

export default function ProductCard(props: Props) {
  return (
    <Link
      href={`/products/${props.id}`}
      className={cn(
        "border-2 flex group py-2 overflow-hidden active:scale-95 hover:cursor-pointer flex-col px-4 relative  w-[250px] h-[350px] transition-transform rounded",
        props.className
      )}
    >
      <img
        src={props.image}
        className="h-[70%] group-hover:scale-110 transition-transform duration-300 w-full object-contain"
        alt=""
      />
      <div>
        <p className="pt-2 line-clamp-2 font-medium mt-auto">{props.name}</p>
        <p className="font-bold text-[18px] absolute bottom-4">
          ${props.price}
        </p>
      </div>
    </Link>
  );
}
