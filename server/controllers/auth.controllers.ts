import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
// import jwt, { JwtPayload } from "jsonwebtoken";

import { User } from "../models/user.modules";

class AuthController {
  // Register a new user
  registerUser = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: "Please provide all fields" });
      }

      // Check if username already exists
      const userExists = await User.findOne({
        username,
      });

      if (userExists) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: "User already exists" });
      }

      const newUser = await User.create(req.body);
      res.status(StatusCodes.CREATED).json({ user: newUser });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send(error);
    }
  };

  // Login a user
  loginUser = async (req: Request, res: Response) => {
    try {
      // let token = req.cookies.token;

      // if (!token) {
      //   return res
      //     .status(StatusCodes.UNAUTHORIZED)
      //     .send({ message: "Token not found" });
      // }

      // const jwtSecret = process.env.JWT_SECRET as string;
      // const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

      // if (!decoded || !decoded.userId) {
      //   res.status(401);
      //   throw new Error("Not authorized, userId not found");
      // }

      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: "Please provide all fields" });
      }

      const user = await User.findOne({
        username,
        password,
      });

      if (!user) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: "Invalid credentials" });
      }

      res.status(StatusCodes.OK).json({ user: user });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send(error);
    }
  };
}

export const authController = new AuthController();
