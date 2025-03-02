import { Router } from "express";
import { addUser, getUserByUsername } from "../controllers/user.controllers.js";

const router = Router();

router.route("/:username").get(getUserByUsername);
router.route("/").post(addUser);

export default router;