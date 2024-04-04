import { Device } from "./device.type";

export interface Action {
  device: Device;
  value: boolean;
}

interface Condition {
  if: {
    device: string;
    value: boolean;
  };
  then: {
    device: string;
    value: boolean;
  };
}

export interface Scene {
  _id: string;
  name: string;
  manual: boolean;
  enabled: boolean;
  actions: Action[];
  // conditions: Condition[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
