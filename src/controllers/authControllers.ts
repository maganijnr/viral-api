import UserModel from "../models/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { validateSignIn, validateSignUp } from "../helpers/validateAuth";
import env from "../helpers/validateEnv";

const generateToken = (username: any, userId: any) => {
	const token = jwt.sign({ username, id: userId }, env.JWT_KEY, {
		expiresIn: "3d",
	});

	return token;
};

export const signInUser = asyncHandler(async (req: Request, res: Response) => {
	const { username, password } = req.body;

	const errorCheck = validateSignIn(username, password);

	if (errorCheck) {
		res.status(400);
		throw new Error(errorCheck);
	}

	//check if user exist
	const existingUser = await UserModel.findOne({ username });

	if (!existingUser) {
		res.status(404);
		throw new Error("User does not exist");
	}

	//compare password
	const comparePassword = await bcrypt.compare(
		password,
		existingUser.password
	);

	if (!comparePassword) {
		res.status(400);
		throw new Error("Incorrect password");
	}

	//Generate token
	const token = generateToken(existingUser?.username, existingUser?._id);

	if (existingUser && token) {
		res.status(200).json({ user: existingUser, token });
	} else {
		res.status(500);
		throw new Error("Something went wrong");
	}
});

export const signUpUser = asyncHandler(async (req: Request, res: Response) => {
	const { username, email, password } = req.body;

	const errorCheck = validateSignUp(username, email, password);

	if (errorCheck) {
		res.status(400);
		throw new Error(errorCheck);
	}

	//Check if username already exist
	const existingUser = await UserModel.findOne({ username: username });

	if (existingUser) {
		res.status(400);
		throw new Error("Username already exists");
	}

	//Hash password
	const hashedPassword = await bcrypt.hash(password, 12);

	//Create user
	const newUser = await UserModel.create({
		username,
		password: hashedPassword,
		email,
	});

	//Generatetoken
	const token = generateToken(newUser?.username, newUser?._id);

	if (newUser && token) {
		res.status(200).json({ user: newUser, token });
	} else {
		res.status(500);
		throw new Error("Something went wrong");
	}
});
