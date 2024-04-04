export interface Room {
  _id: string;
  name: string;
  numberOfDevices?: number;
  createdBy: {
    _id: string;
    username: string;
  };
}
