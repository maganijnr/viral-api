import { Router } from "express";
import {
	commentOnPost,
	createPost,
	deletePost,
	fecthAllPosts,
	likePost,
} from "../controllers/postController";
import { auth } from "../middleware/authMiddleWare";
const router = Router();

router.route("/posts").post(auth, createPost).get(fecthAllPosts);
router.route("/posts/:postId").delete(auth, deletePost);

router.route("/posts/comment/:postId").post(auth, commentOnPost);
router.route("/posts/like/:postId").post(auth, likePost);

export default router;
