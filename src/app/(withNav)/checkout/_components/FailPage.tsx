import { X } from "lucide-react";

export default function FailPage() {
    return (
        <div className="min-h-screen px-10 flex flex-col">
            <div className="relative mt-5 mx-auto w-full max-w-3xl">
                <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-red-500 mt-8 md:mt-16 mx-auto text-white flex items-center justify-center rounded-full">
                        <X className="w-14 stroke-[3] h-14" />
                    </div>
                    <h1 className="text-4xl font-bold pt-5">
                        Oops! Something went wrong.
                    </h1>
                    <p className="text-gray-500 text-md pt-2 mb-2">
                        We&apos;re sorry, but we couldn&apos;t process your
                        request. Please try again later.
                    </p>
                    <div className="flex active:scale-95 transition-all justify-center mt-5">
                        <button onClick={() => window.location.reload()}>
                            <p className="bg-stone-800 text-white py-2 active:scale-95 transition-all px-4 rounded font-medium hover:bg-stone-700">
                                Try again
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
