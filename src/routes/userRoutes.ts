import { Router } from "express";
import {
	followUser,
	getMyProfile,
	getUserProfile,
	searchUsers,
	updateUser,
} from "../controllers/userControllers";
import { auth } from "../middleware/authMiddleWare";

const router = Router();

router.route("/profile-me").get(auth, getMyProfile);
router.route("/profile/:id").get(auth, getUserProfile);
router.route("/follow-user/:id").post(auth, followUser);
router.route("/profile-update").patch(auth, updateUser);
router.route("/search-users").get(auth, searchUsers);

export default router;
