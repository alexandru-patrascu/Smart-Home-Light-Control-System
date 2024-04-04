import { Schema, model, Types } from "mongoose";

// interface ICondition {
//   if: {
//     device: Types.ObjectId;
//     value: string;
//   };
//   then: {
//     device: Types.ObjectId;
//     value: string;
//   };
// }

interface IScene {
  name: string;
  manual: boolean;
  enabled: boolean;
  actions: {
    device: Types.ObjectId;
    value: boolean;
  }[];
  // conditions: ICondition[];
  createdBy: Types.ObjectId;
}

const sceneSchema = new Schema<IScene>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    manual: {
      type: Boolean,
      required: true,
    },
    enabled: {
      type: Boolean,
      required: true,
    },
    actions: [
      {
        device: {
          type: Schema.Types.ObjectId,
          ref: "device",
          required: true,
          autopopulate: true,
        },
        value: {
          type: Boolean,
          required: true,
        },
      },
    ],
    // conditions: [
    //   {
    //     if: {
    //       device: {
    //         type: Schema.Types.ObjectId,
    //         ref: "device",
    //         required: true,
    //         autopopulate: true,
    //       },
    //       value: {
    //         type: String,
    //         required: true,
    //       },
    //     },
    //     then: {
    //       device: {
    //         type: Schema.Types.ObjectId,
    //         ref: "device",
    //         required: true,
    //         autopopulate: true,
    //       },
    //       value: {
    //         type: String,
    //         required: true,
    //       },
    //     },
    //   },
    // ],
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

sceneSchema.plugin(require("mongoose-autopopulate"));

export const Scene = model<IScene>("scene", sceneSchema);
