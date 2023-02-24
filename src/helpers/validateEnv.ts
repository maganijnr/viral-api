import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
	PORT: port(),
	NODE_ENV: str(),
	MONGO_URI: str(),
	JWT_KEY: str(),
	CLOUDINARY_CLOUD_NAME: str(),
	CLOUDINARY_API_KEY: str(),
	CLOUDINARY_API_SECRET: str(),
});
