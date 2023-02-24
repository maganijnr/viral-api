import { Router } from "express";
import {
	createPost,
	deletePost,
	fecthAllPosts,
} from "../controllers/postController";
import { auth } from "../middleware/authMiddleWare";
const router = Router();

router.route("/posts").post(auth, createPost).get(fecthAllPosts);
router.route("/posts/:postId").delete(auth, deletePost);

export default router;
