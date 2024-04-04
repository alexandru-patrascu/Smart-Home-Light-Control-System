import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Room } from "../models/room.modules";
import { Device } from "../models/device.modules";

class RoomController {
  // Create a new room
  createRoom = async (req: Request, res: Response) => {
    try {
      const { name, createdBy } = req.body;

      if (!name || !createdBy) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: "Please provide all fields" });
      }

      const newRoom = await Room.create(req.body);
      res.status(StatusCodes.CREATED).json({ room: newRoom });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send(error);
    }
  };

  // Get all rooms
  getRooms = async (_: Request, res: Response) => {
    try {
      const rooms = await Room.find();

      // Get the number of devices for each room
      const roomsWithDevices = await Promise.all(
        rooms.map(async (room) => {
          const devices = await Device.find({ room: room._id });
          return { ...room.toObject(), numberOfDevices: devices.length };
        })
      );

      res.status(StatusCodes.OK).json({ rooms: roomsWithDevices });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send(error);
    }
  };

  // Get a single room
  getRoom = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const room = await Room.findById({ _id: id });
      res.status(StatusCodes.OK).json({ room });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: "Room not found" });
    }
  };

  // Update a room
  updateRoom = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const updatedRoom = await Room.findByIdAndUpdate({ _id: id }, req.body, {
        new: true,
      });
      res.status(StatusCodes.OK).json({ room: updatedRoom });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: "Room not found" });
    }
  };

  // Delete a room
  deleteRoom = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await Room.findByIdAndDelete({ _id: id });
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: "Room not found" });
    }
  };
}

export const roomController = new RoomController();
