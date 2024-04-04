import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { IUser, User } from "../models/user.modules";

class UserController {
  // Create a new user
  createUser = async (req: Request, res: Response) => {
    try {
      const { username } = req.body;

      if (!username) {
        return res.status(400).send({ message: "Please provide all fields" });
      }

      const newUser = await User.create({
        username,
        password: "Password123!",
      });

      res.status(StatusCodes.CREATED).json({ user: newUser });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send(error);
    }
  };

  // Get all users
  getUsers = async (_: Request, res: Response) => {
    try {
      const users: IUser[] = await User.find();
      res.status(StatusCodes.OK).json({ users });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send(error);
    }
  };

  // Get a single user
  getUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await User.findById({ _id: id });

      res.status(StatusCodes.OK).json({ user });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: "User not found" });
    }
  };

  // Update a user
  updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedUser = await User.findByIdAndUpdate({ _id: id }, req.body, {
        new: true,
      });
      res.status(StatusCodes.OK).json({ user: updatedUser });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: "User not found" });
    }
  };

  // Delete a user
  deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete({ _id: id });
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: "User not found" });
    }
  };
}

export const userController = new UserController();
