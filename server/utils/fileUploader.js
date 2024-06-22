import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv';
import {CloudinaryStorage} from 'multer-storage-cloudinary'


dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
// Configure multer to use Cloudinary storage
export const uploadImageToCloudinary  = async (file, folder, height, quality) => {
  const options = {folder};
  if(height) {
      options.height = height;
  }
  if(quality) {
      options.quality = quality;
  }
  options.resource_type = "auto";

  return await cloudinary.uploader.upload(file.tempFilePath, options);
}