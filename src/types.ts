import { ObjectId } from "mongoose";
export interface IPost {
	message?: string;
	creator: ObjectId;
	imageUrl?: string;
	comments?: [string];
	likes: [ILike];
}

export interface IComment {
	comment: string;
	commentCreator: ObjectId;
}

export interface ILike {
	creator?: ObjectId;
}

export interface IUser {
	username: string;
	email: string;
	password: string;
	avatar?: string;
	followers?: [ObjectId];
	coverPhoto?: string;
}
