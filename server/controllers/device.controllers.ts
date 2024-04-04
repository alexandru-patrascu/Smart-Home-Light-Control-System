import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Device } from "../models/device.modules";

class DeviceController {
  // Create a new device
  createDevice = async (req: Request, res: Response) => {
    try {
      const { name, type, createdBy } = req.body;

      if (!name || !type || !createdBy) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: "Please provide all fields" });
      }

      const newDevice = await Device.create(req.body);
      res.status(StatusCodes.CREATED).json({ device: newDevice });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send(error);
    }
  };

  // Get all devices
  getDevices = async (_: Request, res: Response) => {
    try {
      const devices = await Device.find();
      res.status(StatusCodes.OK).json({ devices });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send(error);
    }
  };

  // Get a single device
  getDevice = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const device = await Device.findById({ _id: id });
      res.status(StatusCodes.OK).json({ device });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: "Device not found" });
    }
  };

  // Update a device
  updateDevice = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedDevice = await Device.findByIdAndUpdate(
        { _id: id },
        req.body,
        {
          new: true,
        }
      );
      res.status(StatusCodes.OK).json({ device: updatedDevice });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: "Device not found" });
    }
  };

  // Toggle a device
  toggleDevice = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const device = await Device.findById({ _id: id });
      const updatedDevice = await Device.findByIdAndUpdate(
        { _id: id },
        {
          status: !device?.status,
        },
        {
          new: true,
        }
      );
      res.status(StatusCodes.OK).json({ device: updatedDevice });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: "Device not found" });
    }
  };

  // Delete a device
  deleteDevice = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await Device.findByIdAndDelete({ _id: id });
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: "Device not found" });
    }
  };
}

export const deviceController = new DeviceController();
