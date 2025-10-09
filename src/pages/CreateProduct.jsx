

export default function CreateProduct() {
    return (
        <div className='flex items-center justify-center w-full h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>

            <div className="flex flex-col min-w-1/4 h-auto bg-white/80 border-gray-700 items-center justify-between rounded-lg shadow-2xl">
                <form className="rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                        leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Product xyz" />
                    </div>


                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                            Price
                        </label>
                        <input className="shadow appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 
                        leading-tight focus:outline-none focus:shadow-outline" id="price" type="number" placeholder="100.5" />
                    </div>


                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                            Stock
                        </label>
                        <input className="shadow appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 
                        leading-tight focus:outline-none focus:shadow-outline" id="stock" type="number" placeholder="5" step={1} />
                    </div>

                    <div className="mt-4 flex text-sm/6 text-gray-400">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-transparent 
                        font-semibold text-indigo-400 focus-within:outline-2 focus-within:outline-offset-2 
                        focus-within:outline-indigo-500 hover:text-indigo-300">

                            <span>Upload an image</span>
                            <input
                                id="file-upload"
                                type="file"
                                name="file-upload"
                                accept="image/*"
                                className="sr-only" />
                        </label>
                    </div>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-8 py-2 px-4 
                    rounded focus:outline-none focus:shadow-outline hover:cursor-pointer" type="button">
                        Create
                    </button>
                </form>
            </div>

        </div>
    )
}