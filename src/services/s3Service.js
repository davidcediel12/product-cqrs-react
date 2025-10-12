import axios from "axios"



export const s3Service = {


    uploadImageToS3: async (url, image) => {
        try {

            const imageUploadResponse = await axios.put(url, image, {
                headers: {
                    "Content-Type": image.type
                }
            })

            if (imageUploadResponse.status === 200) {
                console.log("The image was uploaded!!!!!!!")
            } else {
                console.log(`Upload failed with status: ${imageUploadResponse.status}`)
            }
        } catch (error) {
            console.error("Error from S3", error)
        }
    }
}