import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import env from "../helpers/validateEnv";
import UserModel from "../models/UserModel";

const auth = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		let token;
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			token = req.headers.authorization.split(" ")[1];
			const decoded = jwt.verify(token, env.JWT_KEY);

			const { id } = decoded as JwtPayload;
			const user = (await UserModel.findById({ _id: id }).select(
				"-password"
			)) as any;

			if (!user) {
				res.status(401);
				throw new Error("User does not exist");
			}

			req.user = user;
		}

		if (!token) {
			res.status(401);
			throw new Error("Not authorized, log in");
		}

		next();
	}
);

export { auth };
