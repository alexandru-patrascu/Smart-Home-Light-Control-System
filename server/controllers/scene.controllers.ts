import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Scene } from "../models/scene.modules";
import { Device } from "../models/device.modules";

class SceneController {
  // Create a new scene
  createScene = async (req: Request, res: Response) => {
    try {
      const { name, manual, enabled, actions, createdBy } = req.body;

      if (!name || !actions || !createdBy) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: "Please provide all fields" });
      }

      const newScene = await Scene.create({
        name,
        manual,
        enabled,
        actions: actions.map(
          (action: { device: string; value: boolean | string }) => ({
            device: action.device,
            value: action.value === "true",
          })
        ),
        createdBy,
      });
      res.status(StatusCodes.CREATED).json({ scene: newScene });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send(error);
    }
  };

  // Get all scenes
  getScenes = async (_: Request, res: Response) => {
    try {
      const scenes = await Scene.find();
      res.status(StatusCodes.OK).json({ scenes });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send(error);
    }
  };

  // Get a single scene
  getScene = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const scene = await Scene.findById({ _id: id });
      res.status(StatusCodes.OK).json({ scene });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: "Scene not found" });
    }
  };

  // Update a scene
  updateScene = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedScene = await Scene.findByIdAndUpdate(
        { _id: id },
        req.body,
        {
          new: true,
        }
      );
      res.status(StatusCodes.OK).json({ scene: updatedScene });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: "Scene not found" });
    }
  };

  // Delete a scene
  deleteScene = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await Scene.findByIdAndDelete({ _id: id });
      res.status(StatusCodes.OK).send({ message: "Scene deleted" });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: "Scene not found" });
    }
  };

  // Toggle a scene
  toggleScene = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const scene = await Scene.findById({ _id: id });
      const updatedScene = await Scene.findByIdAndUpdate(
        { _id: id },
        {
          enabled: !scene?.enabled,
        },
        {
          new: true,
        }
      );
      res.status(StatusCodes.OK).json({ scene: updatedScene });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: "Scene not found" });
    }
  };

  // Manually execute a scene
  manuallyTriggerScene = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const scene = await Scene.findById({ _id: id });

      if (!scene) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: "Scene not found" });
      }

      for (const action of scene.actions) {
        const device = await Device.findById({ _id: action.device?._id });

        if (!device) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .send({ message: "Device not found" });
        }

        await Device.findByIdAndUpdate(
          {
            _id: action.device._id,
          },
          {
            status: action.value,
          },
          {
            new: true,
          }
        );
      }

      const allDevices = await Device.find();

      res
        .status(StatusCodes.OK)
        .json({ message: "Scene executed", updatedDevices: allDevices });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: "Scene not found" });
    }
  };
}

export const sceneController = new SceneController();
