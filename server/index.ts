import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import express, { Express } from "express";

import { User } from "./models/user.modules";
import { Room } from "./models/room.modules";
import { Device } from "./models/device.modules";

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import roomRoutes from "./routes/room.routes";
import deviceRoutes from "./routes/device.routes";
import sceneRoutes from "./routes/scene.routes";

dotenv.config(); // to use the .env file

const app: Express = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
};

app.use(cookieParser()); // to parse the incoming cookies
app.use(express.json()); // to parse the incoming requests with JSON payloads
app.use(cors(corsOptions)); // to allow cross-origin requests

app.use("/api", [
  userRoutes,
  authRoutes,
  roomRoutes,
  deviceRoutes,
  sceneRoutes,
]);

const port = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error(error);
  }
};

const initData = async () => {
  const hasAdminUser = await User.findOne({ username: "admin" });

  if (hasAdminUser) {
    return;
  }

  await mongoose.connection.dropDatabase();

  const user = await User.create({
    username: "admin",
    password: "Password123!",
    role: "admin",
  });

  const rooms = await Room.insertMany([
    { name: "Bedroom", createdBy: user._id },
    { name: "Living Room", createdBy: user._id },
    { name: "Kitchen", createdBy: user._id },
  ]);

  await Device.insertMany([
    {
      name: "Device 1",
      createdBy: user?._id,
      type: "light",
      room: rooms[0]._id,
    },
    {
      name: "Device 2",
      createdBy: user?._id,
      type: "switch",
      room: rooms[0]._id,
      connected: false,
    },
    {
      name: "Device 3",
      createdBy: user?._id,
      type: "door-sensor",
      room: rooms[0]._id,
    },
  ]);
};

// connect to MongoDB and starting the server
startServer();
initData();
