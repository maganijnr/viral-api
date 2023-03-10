import env from "../helpers/validateEnv";
import mongoose from "mongoose";

const connectDB = async () => {
	mongoose.set("strictQuery", false);
	try {
		await mongoose.connect(env.MONGO_URI);
		console.log("Connected successfully");
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

export default connectDB;
