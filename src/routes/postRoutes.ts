import { Router } from "express";
import { createPost } from "../controllers/postController";
import { auth } from "../middleware/authMiddleWare";
import fs from "fs";

import multer from "multer";

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "../uploads/posts");
	},
	filename: (req, file, callback) => {
		callback(null, file.fieldname + "-" + Date.now());
	},
});

const router = Router();

router.route("/posts").post(auth, createPost);

export default router;
