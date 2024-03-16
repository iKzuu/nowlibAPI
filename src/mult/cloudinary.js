import { apiKey } from '@/helpers/middleware';
import cloudinary from 'cloudinary';
import { resolve } from 'styled-jsx/css';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploads = (file, folder) => {
    return new Promise((resolve, reject) => {
        cloudinary.UploadStream.upload(
            file,
            (result) => {
                resolve({
                    public_id: result.public_id,
                    url: result.url,
                });
            },
    
            {
                resource_type: "auto",
                folder: folder,
    
            }
        );
    });
};

export { uploads, cloudinary }