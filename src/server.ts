import "dotenv/config";
import express from "express";
import errorHandler from "./helpers/errorHandler";
import env from "./helpers/validateEnv";
import connectDB from "./config/connectDb";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import postRoutes from "./routes/postRoutes";

const app = express();

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", postRoutes);

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