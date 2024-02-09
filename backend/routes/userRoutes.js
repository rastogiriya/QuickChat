import express from "express";
import { register, login, setAvatar } from "../controller/usersController.js";
// import SetAvatar from "../../frontend/src/pages/SetAvatar.jsx";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);

export default router;
