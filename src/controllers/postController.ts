import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import fs from "fs";
// import multer from 'multer'

// const storage = multer.diskStorage({
// 	destination: (req, file, callback) => {
// 		callback(null, '../uploads/posts')
// 	},
// 	filename: (req, file, callback) => {
// 		callback(null, file.originalname)
// 	}
// })

// const upload = multer({storage: storage})

export const createPost = asyncHandler(async (req: Request, res: Response) => {
	// var img = fs.readFileSync(req?.file.path);
	//  var encode_img = img.toString('base64');
	//  var final_img = {
	//      contentType: req?.file.mimetype,
	//      image:new Buffer(encode_img,'base64')
	//  };
	const newPost = req.body;

	res.json(newPost);
});
