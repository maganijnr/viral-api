import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import PostModel from "../models/PostModel";

//Create a post
// /api/posts
// protected
export const createPost = asyncHandler(async (req: Request, res: Response) => {
	const { message, imageUrl } = req.body;
	const user = req.user;

	const newPost = await PostModel.create({
		message,
		//@ts-ignore
		creator: user?._id,
		imageUrl,
	});

	if (newPost) {
		res.status(201).json({ message: "Sucessfully created", post: newPost });
	} else {
		res.status(400);
		throw new Error("Something went wrong");
	}
});

//Get all posts
// /api/posts
export const fecthAllPosts = asyncHandler(
	async (req: Request, res: Response) => {
		const allPosts = await PostModel.find().sort("-createdAt");

		if (allPosts) {
			res.status(200).json({ posts: allPosts });
		} else {
			res.status(400);
			throw new Error("Something went wrong");
		}
	}
);

//Delete a single post
// /api/post/:postId
//Protected
export const deletePost = asyncHandler(async (req: Request, res: Response) => {
	const postId = req.params.postId;

	const response = await PostModel.findByIdAndDelete({ _id: postId });
	if (!response) {
		res.status(404);
		throw new Error("Post does not exist");
	}

	if (response) {
		res.status(200).json({ message: "Deleted successfully" });
	} else {
		res.status(400);
		throw new Error("Something went wrong");
	}
});

//comment a single post
// /api/post/:postId
//Protected
export const commentOnPost = asyncHandler(
	async (req: Request, res: Response) => {
		//@ts-ignore
		if (!req.user._id) {
			res.status(400);
			throw new Error("Unauthenticated");
		}

		if (!mongoose.Types.ObjectId.isValid(req.params.postId)) {
			res.status(404);
			throw new Error("Post does not exist");
		}

		const post = await PostModel.findById(req.params.postId);

		const { comment } = req.body;

		//@ts-ignore
		const postComment = `${req.user.username}: ${comment} `;

		post?.comments?.push(postComment);

		//@ts-ignore
		const updatedPost = await PostModel.findByIdAndUpdate(post?._id, post, {
			new: true,
		});

		if (updatedPost) {
			res.status(200).json({ message: "Comment posted", post: updatedPost });
		} else {
			res.status(404);
			throw new Error("Something went wrong");
		}
	}
);

export const likePost = asyncHandler(async (req: Request, res: Response) => {
	//@ts-ignore
	if (!req.user._id) {
		res.status(400);
		throw new Error("Unauthenticated");
	}

	if (!mongoose.Types.ObjectId.isValid(req.params.postId)) {
		res.status(404);
		throw new Error("Post does not exist");
	}

	const post = await PostModel.findById(req.params.postId);
	//@ts-ignore
	const index = post?.likes.findIndex((id) => id === String(req.user._id));

	if (index === -1) {
		//@ts-ignore
		post?.likes.push(req.user._id);
	} else {
		//@ts-ignore
		post?.likes = post?.likes.filter((id) => id !== String(req.user._id));
	}

	//@ts-ignore
	const updatedPost = await PostModel.findByIdAndUpdate(post?._id, post, {
		new: true,
	});

	if (updatedPost) {
		res.status(200).json({ message: "Liked function", post: updatedPost });
	} else {
		res.status(404);
		throw new Error("Something went wrong");
	}
});
