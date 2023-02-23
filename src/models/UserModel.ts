import { Schema, model } from "mongoose";
import { IUser } from "../types";

const userModel = new Schema<IUser>(
	{
		username: {
			type: String,
			required: [true, "Username is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		avatar: {
			type: String,
			default:
				"https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg",
		},
	},
	{ timestamps: true }
);

const UserModel = model("User", userModel);

export default UserModel;
