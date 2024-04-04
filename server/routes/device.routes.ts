import express from "express";
import { deviceController } from "../controllers/device.controllers";

const router = express.Router();

// Create a new device
router.post("/devices", deviceController.createDevice);

// Get all devices
router.get("/devices", deviceController.getDevices);

// Get a single device
router.get("/devices/:id", deviceController.getDevice);

// Update a device
router.patch("/devices/:id", deviceController.updateDevice);

// Toggle a device
router.patch("/devices/:id/toggle", deviceController.toggleDevice);

// Delete a device
router.delete("/devices/:id", deviceController.deleteDevice);

export default router;
