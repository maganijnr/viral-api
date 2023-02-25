import { Schema, model } from "mongoose";
import { IPost } from "../types";
import CommentModel from "./CommentModel";

const postModel = new Schema<IPost>(
	{
		message: {
			type: String,
			maxlength: 500,
		},
		creator: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Creator is required"],
		},
		imageUrl: {
			type: String,
		},
		likes: {
			type: [String],
			default: [],
		},
		comments: {
			type: [String],
			default: [],
		},
	},
	{ timestamps: true }
);

const PostModel = model("Post", postModel);

export default PostModel;
