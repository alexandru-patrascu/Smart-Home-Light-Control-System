import { Schema, model, Types } from "mongoose";

interface IDevice {
  name: string;
  type: string;
  connected: boolean;
  status: boolean;
  version: string;
  brightness?: number;
  room?: Types.ObjectId;
  createdBy: Types.ObjectId;
}

const deviceSchema = new Schema<IDevice>(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
      default: "1.0.0",
    },
    status: {
      type: Boolean, // ON or OFF
      required: true,
      default: false,
    },
    connected: {
      type: Boolean,
      required: true,
      default: true,
    },
    brightness: {
      type: Number, // 0 to 100
      required: false,
      default: 100,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "room",
      required: false,
      autopopulate: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      autopopulate: true,
    },
  },
  {
    timestamps: true,
  }
);

deviceSchema.plugin(require("mongoose-autopopulate"));

export const Device = model<IDevice>("device", deviceSchema);
