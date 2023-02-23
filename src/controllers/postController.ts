import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

export const createPost = asyncHandler(async (req: Request, res: Response) => {
	const user = req.user;
	res.json({ user });
});
