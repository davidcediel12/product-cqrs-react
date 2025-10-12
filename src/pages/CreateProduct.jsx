import axios from "axios"
import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";



// const API_URL = "http://ad008d72c25544a379eabb72fc401561-1818218894.us-east-2.elb.amazonaws.com:8080"
const API_URL = "http://localhost:8080"


export default function CreateProduct() {

    const [formData, setFormData] = useState({
        productName: '',
        price: '',
        stock: '',
        images: [],
        imagePreview: null
    });


    useEffect(() => {
        return () => { // When the use effect returns a function, it is called before removing the component
            if(formData.imagePreview){
                console.log("Removing image preview to avoid memory leaks");
                URL.revokeObjectURL(formData.imagePreview);
            }
        }
    });


    async function createProduct(e) {
        e.preventDefault();

        console.log("Form submitted")

        try {
            const response = await axios.post(API_URL + "/products", {
                productName: "react name",
                price: 20.1,
                stock: 10,
                images: [
                    {
                        url: "react.url",
                        isPrimary: true
                    }
                ]
            });

            console.log("Response from Go", response.data)
        } catch (error) {
            console.log("Error from Go", error)
        }

        console.log("End function")
    }


    function onFormChange(e) {
        const { name, value, files, type } = e.target; // 'name' and 'value' can be any field. It depends on which one changes


        console.log(name + " of type " + type + " changed: " + value)

        if (type === 'file') {

            const file = files[0];

            const previewUrl = URL.createObjectURL(file);

            console.log("new preview url: " + previewUrl)

            setFormData((prev) => ({
                ...prev,
                [name]: files,
                imagePreview: previewUrl
            }));

            return;
        }


        setFormData((prev) => ({
            ...prev,
            [name]: value // [name] with braces cuz I'm using a variable, not the attribute 'name' 
        }))
    }


    function deleteImage(){
        setFormData((prev) => ({
            ...prev, 
            images: [],
            imagePreview: null

        }));
    }

    return (
        <div className='flex items-center justify-center w-full h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>

            <div className="flex flex-col min-w-1/4 h-auto bg-white/80 border-gray-700 items-center justify-between rounded-lg shadow-2xl">
                <form className="rounded px-8 pt-6 pb-8 mb-4"
                    onSubmit={e => createProduct(e)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product-name">
                            Name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                        leading-tight focus:outline-none focus:shadow-outline"
                            id="product-name" type="text"
                            placeholder="Product xyz"
                            name="productName"
                            onChange={e => onFormChange(e)}
                            value={formData.productName} />
                    </div>


                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                            Price
                        </label>
                        <input className="shadow appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 
                        leading-tight focus:outline-none focus:shadow-outline"
                            id="price"
                            type="number"
                            name="price"
                            placeholder="100.5"
                            onChange={e => onFormChange(e)}
                            value={formData.price} />
                    </div>


                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                            Stock
                        </label>
                        <input className="shadow appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 
                        leading-tight focus:outline-none focus:shadow-outline"
                            id="stock"
                            type="number"
                            name="stock"
                            placeholder="5" step={1}
                            onChange={e => onFormChange(e)}
                            value={formData.stock} />
                    </div>

                    <div className="mt-4 flex text-sm/6 text-gray-400">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-transparent 
                        font-semibold text-indigo-400 focus-within:outline-2 focus-within:outline-offset-2 
                        focus-within:outline-indigo-500 hover:text-indigo-300">

                            <span>Upload an image</span>
                            <input
                                id="file-upload"
                                type="file"
                                name="images"
                                accept="image/*"
                                className="sr-only"
                                onChange={e => onFormChange(e)}
                            />
                        </label>

                        {formData.imagePreview && (

                            <>
                                <img
                                    src={formData.imagePreview}
                                    alt="preview"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded 
                            hover:cursor-pointer max-w-8"/>

                                <button onClick={deleteImage}>
                                    <FaTrash className="hover:cursor-pointer hover:text-red-500" />
                                </button>

                                <button>
                                    <FaPlus className="hover:cursor-pointer hover:text-blue-500" />
                                </button>
                            </>
                        )}
                    </div>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-8 py-2 px-4 
                    rounded focus:outline-none focus:shadow-outline hover:cursor-pointer hover:text-green" type="submit">
                        Create
                    </button>
                </form>
            </div>

        </div>
    )
}