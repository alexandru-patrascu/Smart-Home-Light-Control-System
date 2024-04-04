import { Schema, model, Types } from "mongoose";

interface IRoom {
  name: string;
  createdBy: Types.ObjectId;
}

const roomSchema = new Schema<IRoom>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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

roomSchema.plugin(require("mongoose-autopopulate"));

export const Room = model<IRoom>("room", roomSchema);
