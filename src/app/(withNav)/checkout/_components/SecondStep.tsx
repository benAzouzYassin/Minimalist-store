"use client";
import { useState } from "react";
import SecondStepForm from "./SecondStepForm";
import FailPage from "./FailPage";

export default function SecondStep() {
    const [isFailure, setIsFailure] = useState(false);

    if (isFailure) {
        return <FailPage />;
    }
    return (
        <section className="w-[1200px] pb-20 min-h-[700px]  h-fit mt-10  flex ">
            <div className="flex-grow max-w-[1000px] mx-auto h-fit">
                <SecondStepForm handleFailure={() => setIsFailure(true)} />
            </div>
        </section>
    );
}
