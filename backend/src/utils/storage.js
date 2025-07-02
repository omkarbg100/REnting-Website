import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || (() => { console.error('❌ Missing CLOUD_NAME'); })(),
  api_key: process.env.CLOUDINARY_API_KEY || (() => { console.error('❌ Missing API_KEY'); })(),
  api_secret: process.env.CLOUDINARY_API_SECRET || (() => { console.error('❌ Missing API_SECRET'); })(),
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'rentmate-properties',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 800, height: 600, crop: 'limit' }]
  },
});

export default storage;
