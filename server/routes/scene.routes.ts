import express from "express";
import { sceneController } from "../controllers/scene.controllers";

const router = express.Router();

// Create a new scene
router.post("/scenes", sceneController.createScene);

// Get all scenes
router.get("/scenes", sceneController.getScenes);

// Get a single scene
router.get("/scenes/:id", sceneController.getScene);

// Update a scene
router.patch("/scenes/:id", sceneController.updateScene);

// Delete a scene
router.delete("/scenes/:id", sceneController.deleteScene);

// Manually trigger a scene
router.patch("/scenes/:id/trigger", sceneController.manuallyTriggerScene);

export default router;
