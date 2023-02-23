import env from "./validateEnv";

const errorHandler = (
	err: { message: any; stack: any },
	req: any,
	res: {
		statusCode: any;
		status: (arg0: any) => void;
		json: (arg0: { message: any; stack: any }) => void;
	},
	next: any
) => {
	const statusCode = res.statusCode ? res.statusCode : 500;

	res.status(statusCode);
	res.json({
		message: err.message,
		stack: env.NODE_ENV === "development" ? err.stack : null,
	});
};

export default errorHandler;
