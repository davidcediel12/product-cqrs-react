import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaSpinner } from "react-icons/fa";
import { productService } from "../services/productService";
import { s3Service } from "../services/s3Service";



function ImageSection({ onFormChange, setFormData, formData }) {


    function deleteImage(imageUrl) {

        console.log("Deleting the image " + imageUrl);

        console.log("Images ", formData.images);

        const newImages = formData.images.filter(image => image.url !== imageUrl);
        URL.revokeObjectURL(imageUrl);


        console.log("New Images ", newImages);

        setFormData((prev) => (
            {
                ...prev,
                images: newImages,

            }
        ));
    }


    return (
        <div>
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
                        multiple
                        className="sr-only"
                        onChange={e => onFormChange(e)}
                    />
                </label>

                {formData.images.map(image => (

                    <div key={image.url}>
                        <img
                            src={image.url}
                            alt="preview"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded 
                            hover:cursor-pointer max-w-8"/>

                        <button type="button" onClick={() => deleteImage(image.url)}>
                            <FaTrash className="hover:cursor-pointer hover:text-red-500" />
                        </button>

                        <button>
                            <FaPlus type="button" className="hover:cursor-pointer hover:text-blue-500" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )



}



export default function CreateProduct() {

    const [formData, setFormData] = useState(getInitialFormData());

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        return () => { // When the use effect returns a function, it is called before removing the component
            formData.images.forEach(image => {

                console.log("Removing image preview to avoid memory leaks");
                URL.revokeObjectURL(image.url);
            })
        }
    }, []);


    async function createProduct(e) {
        e.preventDefault();

        console.log("Form submitted")

        setIsLoading(true)

        const imageNames = formData.images.map(image => ({ name: image.img.name }));


        const imageUrlsResponse = await productService.createImageUrls(imageNames);

        console.log("Urls obtained", imageUrlsResponse);

        const urls = imageUrlsResponse.urls;

        for (let i = 0; i < urls.length; i++) {


            const img = formData.images[i].img;

            console.log(`Uploading image ${img.name} to url ${urls[i]}`);
            console.log("the image is", img);

            await s3Service.uploadImageToS3(urls[i], img);
        }


        const backendImages = urls.map(url => url.split("?", 1)[0]).map(cleanUrl => ({ url: cleanUrl, isPrimary: true }));


        const response = productService.createProduct({
            name: formData.productName,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            images: backendImages
        });

        console.log("Response from Go", response.data);

        setIsLoading(false);
        setFormData(getInitialFormData());

        console.log("End function");
    }


    function onFormChange(e) {
        const { name, value, files, type } = e.target; // 'name' and 'value' can be any field. It depends on which one changes


        console.log(name + " of type " + type + " changed: " + value)

        if (type === 'file') {

            const newImages = Array.from(files).map(file => ({ img: file, url: URL.createObjectURL(file) }));

            setFormData((prev) => ({
                ...prev,
                images: [...prev.images, ...newImages]
            }));

            e.target.value = null;

            return;
        }


        setFormData((prev) => ({
            ...prev,
            [name]: value // [name] with braces cuz I'm using a variable, not the attribute 'name' 
        }))
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

                    <ImageSection
                        onFormChange={onFormChange}
                        setFormData={setFormData}
                        formData={formData} />


                    <button className="flex justify-center items-center gap-2  bg-blue-500 hover:bg-blue-700 text-white font-bold my-8 py-2 px-4 
                    rounded focus:outline-none focus:shadow-outline hover:cursor-pointer hover:text-green"
                        type="submit">
                        {isLoading && <FaSpinner className="animate-spin" />}
                        Create
                    </button>
                </form>
            </div>

        </div>
    )
}

function getInitialFormData() {
    return {
        productName: '',
        price: '',
        stock: '',
        images: []
    };
}