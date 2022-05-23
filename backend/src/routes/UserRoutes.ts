import { Router } from "express";
const router = Router();

import UserController from "../controllers/UserController";
const { register, login, checkUser, getUserById, editUser, follow, getUserSuggestions } = UserController;

import checkToken from "../helpers/check-token";
import imageUpload from "../helpers/image-upload";

router.post("/register", register);
router.post("/login", login);
router.get("/checkuser", checkUser);
router.get("/suggestions", [checkToken], getUserSuggestions);
router.get("/:id", getUserById);
router.patch("/edit/:id", [checkToken, imageUpload.single("image")], editUser);
router.put("/follow/:id", checkToken, follow);


export default router;
