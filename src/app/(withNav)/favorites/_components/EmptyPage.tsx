import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function EmptyPage() {
    return (
        <section className="min-h-screen">
            <section className="pt-56">
                <div className="flex justify-center w-full pt-5 flex-col">
                    <p className="w-full text-center font-medium opacity-40  mt-2 mx-auto">
                        <span className="text-5xl font-medium">
                            No favorite products
                        </span>{" "}
                        <br />
                    </p>
                    <div className="flex active:scale-95 transition-all justify-center mt-5">
                        <Link href="/">
                            <p className="bg-stone-800 text-white py-2  active:scale-95 transition-all px-4 rounded font-medium hover:bg-stone-700">
                                Continue shopping
                            </p>
                        </Link>
                    </div>
                </div>
            </section>
        </section>
    );
}
