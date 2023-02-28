import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import PostModel from "../models/PostModel";

export const getMyProfile = asyncHandler(
	async (req: Request, res: Response) => {
		//@ts-ignore
		const userId = req.user._id;

		const user = await UserModel.findById({ _id: userId })
			.populate("creator")
			.exec();

		if (!user) {
			res.status(404);
			throw new Error(`User not found`);
		}

		//Get User Posts
		const posts = await PostModel.find({ creator: userId });

		res.status(200).json({ user: user, userPosts: posts });
	}
);

export const getUserProfile = asyncHandler(
	async (req: Request, res: Response) => {
		const id = req.params.id;

		const user = await UserModel.findById({ _id: id })
			.populate("creator")
			.exec();

		if (!user) {
			res.status(404);
			throw new Error(`User not found`);
		}

		//Get User Posts
		const posts = await PostModel.find({ creator: user._id });

		res.status(200).json({ user: user, userPosts: posts });
	}
);

export const followUser = asyncHandler(async (req: Request, res: Response) => {
	//@ts-ignore
	const userId = req.user._id;

	const id = req.params.id;
	const user = await UserModel.findById({ _id: id })
		.populate("creator")
		.exec();

	if (!user) {
		res.status(404);
		throw new Error(`User not found`);
	}

	//@ts-ignore
	const index = user?.followers?.findIndex(
		//@ts-ignore
		(id) => String(id) === String(req.user._id)
	);

	if (index === -1) {
		//@ts-ignore
		user.followers.push(req.user._id);
	} else {
		//@ts-ignore
		user.followers = user?.followers?.filter(
			//@ts-ignore
			(id) => String(id) !== String(req.user._id)
		);
	}

	const updateUser = await UserModel.findByIdAndUpdate(id, user, {
		new: true,
	});

	if (updateUser) {
		res.status(200).json({ message: "Success", user: updateUser });
	} else {
		res.status(400);
		throw new Error("Something went wrong");
	}
});
