import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader
        .upload(localFilePath, {
            resource_type: "auto"
        })
        .catch((error)=>{
          console.log("cld err: ",error);
        })
        // file has been uploaded successfull
        // console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

export {uploadOnCloudinary}
// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // (async function uploadOnCloudinary1(localPath) {
// //   const result = await cloudinary.uploader.upload(localPath);
// //   console.log(`Successfully uploaded ${localPath}`);
// //   console.log(`> Result: ${result.secure_url}`);
// // })();

// const uploadOnCloudinary = async (fileLocalPath) => {
//   try {
//     if (!fileLocalPath) return;

//     const result = await cloudinary.uploader.upload(fileLocalPath, {
//       resource_type: "auto",
//     });

//     fs.unlink(fileLocalPath, (err) => {
//       if (err) throw err;
//       console.log("fs Unlink Error");
//     });

//     return result;
//   } catch (error) {
//     fs.unlink(fileLocalPath, (err) => {
//       console.log("fs Unlink Error");
//     });

//     return null;
//   }
// };

// export {uploadOnCloudinary}