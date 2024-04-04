export interface Device {
  _id: string;
  name: string;
  type: string;
  version: string;
  connected: boolean;
  status: boolean;
  brightness?: number;
  room?: {
    _id: string;
    name: string;
  };
  createdBy: {
    _id: string;
    username: string;
  };
}
