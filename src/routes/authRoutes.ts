import { signInUser, signUpUser } from "./../controllers/authControllers";
import { Router } from "express";

const router = Router();

router.route("/signin").post(signInUser);
router.route("/signup").post(signUpUser);

export default router;
