import express from "express";
import { userController } from "../controllers/user.controllers";

const router = express.Router();

// Create a new user
router.post("/users", userController.createUser);

// Get all users
router.get("/users", userController.getUsers);

// Get a single user
router.get("/users/:id", userController.getUser);

// Update a user
router.patch("/users/:id", userController.updateUser);

// Delete a user
router.delete("/users/:id", userController.deleteUser);

export default router;
