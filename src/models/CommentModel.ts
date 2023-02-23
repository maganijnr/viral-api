import { Schema, model } from "mongoose";
import { IComment } from "../types";

const commentModel = new Schema<IComment>(
	{
		comment: {
			type: String,
		},
		commentCreator: {
			type: String,
			ref: "User",
			required: [true, "Required"],
		},
	},
	{ timestamps: true }
);

const CommentModel = model("Comment", commentModel);

export default CommentModel;
