import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
// router.route('/').get(protect, admin, getUsers)

export default router;
