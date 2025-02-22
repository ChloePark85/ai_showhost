import { BackgroundWave } from "@/components/background-wave";
import { ConvAI } from "@/components/ConvAI";
export default function Page() {
    return (
        <div className="flex flex-col flex-grow w-full items-center justify-center relative">
            <div
                className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <main className="flex flex-col gap-8 row-start-2 items-center">
                    <ConvAI />
                </main>
            </div>
            <BackgroundWave />
        </div >
    );
}