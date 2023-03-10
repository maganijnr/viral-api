import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import PostModel from "../models/PostModel";

export const getMyProfile = asyncHandler(
	async (req: Request, res: Response) => {
		//@ts-ignore
		const userId = req.user._id;

		const user = await UserModel.findById({ _id: userId });

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

		const user = await UserModel.findById({ _id: id });

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
	const user = await UserModel.findById({ _id: id });

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

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
	//@ts-ignore
	const user = await UserModel.findById(req.user._id);

	if (user) {
		const { username, email, avatar, coverPhoto } = user;
		user.username = req.body.username || username;
		user.email = req.body.email || email;
		user.avatar = req.body.avatar || avatar;
		user.coverPhoto = req.body.coverPhoto || coverPhoto;

		const updateUser = await user.save();

		res.status(200).json({ message: "User updated", user: updateUser });
	} else {
		res.status(400);
		throw new Error("User not found");
	}
});

export const searchUsers = asyncHandler(async (req: Request, res: Response) => {
	const user = req.query.user
		? {
				username: {
					$regex: req.query.user,
					$options: "i",
				},
		  }
		: {};

	const users = await UserModel.find({ ...user }).sort("-createdAt");

	if (users) {
		res.status(200).json({ users });
	} else {
		res.status(404);
		throw new Error(`User not found`);
	}
});

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
	const users = await UserModel.find().select("-password");

	const unfollowedUsers = users.filter(
		(x) =>
			//@ts-ignore
			!x.followers?.includes(req.user._id)
	);

	res.status(200).json({ users: unfollowedUsers });
});
