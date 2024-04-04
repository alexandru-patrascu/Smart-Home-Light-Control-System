import express from "express";
import { roomController } from "../controllers/room.controllers";

const router = express.Router();

// Create a new room
router.post("/rooms", roomController.createRoom);

// Get all rooms
router.get("/rooms", roomController.getRooms);

// Get a single room
router.get("/rooms/:id", roomController.getRoom);

// Update a room
router.patch("/rooms/:id", roomController.updateRoom);

// Delete a room
router.delete("/rooms/:id", roomController.deleteRoom);

export default router;
