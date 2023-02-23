import { IUser } from "../types";

const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const validateSignUp = (
	username: string,
	email: string,
	password: string
) => {
	if (!username) {
		return "Username is required";
	}

	if (!email) {
		return "Email is required";
	} else if (!email.toLowerCase().match(regex)) {
		return "Enter a valid mail address";
	}

	if (!password) {
		return "Password is required";
	} else if (password.length < 6) {
		return "Password is short";
	}

	return null;
};

export const validateSignIn = (username: string, password: string) => {
	if (!username) {
		return "Username is required";
	}

	if (!password) {
		return "Password is required";
	} else if (password.length < 6) {
		return "Password is short";
	}

	return null;
};
