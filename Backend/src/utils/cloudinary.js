import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// (async function uploadOnCloudinary1(localPath) {
//   const result = await cloudinary.uploader.upload(localPath);
//   console.log(`Successfully uploaded ${localPath}`);
//   console.log(`> Result: ${result.secure_url}`);
// })();

const uploadOnCloudinary = async (fileLocalPath) => {
  try {
    if (!fileLocalPath) return;

    const result = await cloudinary.uploader.upload(fileLocalPath, {
      resource_type: "auto",
    });

    fs.unlink(fileLocalPath, (err) => {
      if (err) throw err;
      console.log("fs Unlink Error");
    });

    return result;
  } catch (error) {
    fs.unlink(fileLocalPath, (err) => {
      console.log("fs Unlink Error");
    });

    return null;
  }
};

export {uploadOnCloudinary}