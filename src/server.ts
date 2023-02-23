import "dotenv/config";
import express from "express";
import errorHandler from "./helpers/errorHandler";
import env from "./helpers/validateEnv";
import mongoose, { mongo } from "mongoose";
import connectDB from "./config/connectDb";

const app = express();

app.use(errorHandler);

const startServer = async () => {
	try {
		await connectDB();
		app.listen(env.PORT, () => {
			console.log(`Server is running on ${env.PORT}`);
		});
	} catch (error) {
		console.error(error);
	}
};

startServer();
