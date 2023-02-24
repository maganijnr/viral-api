import "dotenv/config";
import express from "express";
import errorHandler from "./helpers/errorHandler";
import env from "./helpers/validateEnv";
import connectDB from "./config/connectDb";
import bodyParser from "body-parser";
import expressFile from "express-fileupload";
import authRoutes from "./routes/authRoutes";
import postRoutes from "./routes/postRoutes";
import uploadRoutes from "./routes/uploadRoute";
import cors from "cors";

const app = express();

app.use(
	cors({
		origin: ["http://localhost:5173"],
	})
);

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
	expressFile({
		limits: { fileSize: 50 * 1024 * 1024 },
	})
);
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", postRoutes);
app.use("/api", uploadRoutes);

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
