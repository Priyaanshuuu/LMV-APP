import express from "express";
import { register, login } from "../controllers/user.controller.js";

const router = express.Router();

// Define routes for user registration and login
router.post("/register", register);
router.post("/login", login);

export default router;
