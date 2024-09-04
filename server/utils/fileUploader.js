import cloudinary from 'cloudinary';
import dotenv from 'dotenv';



dotenv.config();

cloudinary.v2.config({
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
  if (file.mimetype.startsWith('video')) {
    options.resource_type = 'video';
  } else {
    options.resource_type = 'image';
  }

  try {
    const result = await cloudinary.v2.uploader.upload(file.tempFilePath, options);
    console.log('Upload Result:', result);
    return result;
  } catch (error) {
    console.error('Upload Error:', error);
    throw error;
  }
}