import { model, Schema } from "mongoose";

const profileModel = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		posts: {
			type: [Schema.Types.ObjectId],
			ref: "Post",
		},
		coverPhoto: {
			type: String,
			default:
				"https://bikaash.com.np/wp-content/themes/miyazaki/assets/images/default-fallback-image.png",
		},
		followers: {
			type: [Schema.Types.ObjectId],
			ref: "User",
		},
	},
	{ timestamps: true }
);

const ProfileModel = model("Profile", profileModel);

export default ProfileModel;
