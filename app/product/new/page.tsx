export default function Page() {
    return (
        <div className="w-full h-full flex justify-center">
            <div className="container max-w-screen-xl">
                <div className="flex flex-col gap-4 p-12">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">New Product</h1>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-xl font-bold">Product Information</h2>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}