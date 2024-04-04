import express from "express";
import { authController } from "../controllers/auth.controllers";

const router = express.Router();

// Register a new user
router.post("/register", authController.registerUser);

// Login a user
router.post("/login", authController.loginUser);

export default router;
