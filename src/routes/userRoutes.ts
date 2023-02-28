import { Router } from "express";
import {
	followUser,
	getMyProfile,
	getUserProfile,
} from "../controllers/userControllers";
import { auth } from "../middleware/authMiddleWare";

const router = Router();

router.route("/profile-me").get(auth, getMyProfile);
router.route("/profile/:id").get(auth, getUserProfile);
router.route("/follow-user/:id").post(auth, followUser);

export default router;
