import cloudinary from "cloudinary";
import env from "../helpers/validateEnv";
import { Router } from "express";

const router = Router();
const cloud = cloudinary.v2;

cloud.config({
	cloud_name: env.CLOUDINARY_CLOUD_NAME,
	api_key: env.CLOUDINARY_API_KEY,
	api_secret: env.CLOUDINARY_API_SECRET,
});

const uploadSingleImage = async (image: any) => {
	return new Promise((resolve, reject) => {
		cloud.uploader.upload(
			image,
			{ overwite: true, invalidate: true, resource_type: "auto" },
			(error, result) => {
				if (result && result.secure_url) {
					return resolve(result.secure_url);
				}

				console.error(error);
				return reject({ message: "Something went wrong" });
			}
		);
	});
};

router.post("/upload-post", async (req, res) => {
	const baseImage = req.body.image;

	uploadSingleImage(baseImage)
		.then((url) => res.send(url))
		.catch((err) => console.log(err));
});

export default router;
