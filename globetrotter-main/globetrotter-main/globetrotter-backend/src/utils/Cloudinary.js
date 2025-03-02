import { v2 as cloudinary } from "cloudinary";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (username, score) => {
  try {
    console.log("Uploading image to Cloudinary...");
    const imagePath = path.resolve("public", "challenge.jpg");

    console.log("Image path:", imagePath);
    const res = await cloudinary.uploader.upload(imagePath, {
      resource_type: "auto",
      transformation: [
        { width: 800, height: 400, crop: "fill" },
        { overlay: `text:Arial_50_bold:Username: ${username}`, gravity: "north", y: 30 },
        {
          overlay: `text:Arial_40_bold:Score: ${score}`,
          gravity: "south",
          y: 30,
        },
      ],
    });

    console.log("Image uploaded to Cloudinary:", res.url);
    if (res) {
      return res.url;
    }
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
  }
};

export { uploadOnCloudinary };
