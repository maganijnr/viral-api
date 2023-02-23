import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
	PORT: port(),
	NODE_ENV: str(),
	MONGO_URI: str(),
	JWT_KEY: str(),
});
