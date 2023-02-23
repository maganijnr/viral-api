import { Router } from "express";
import { createPost } from "../controllers/postController";
import { auth } from "../middleware/authMiddleWare";

const router = Router();

router.route("/posts").post(auth, createPost);

export default router;
