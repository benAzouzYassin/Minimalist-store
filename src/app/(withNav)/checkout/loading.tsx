import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function Loading() {
    return (
        <main className="main-content min-h-screen ">
            <div className="h-[80vh] w-screen flex items-center justify-center">
                <LoadingSpinner className="w-12 h-12" />
            </div>
        </main>
    );
}
