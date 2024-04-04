import useApi from "hooks/useApi";
import { Error, Loading } from "components";
import { Device, Room, Scene, User } from "types";

import { GeneralDetails, MostUsedDevices, MostUsedScenes } from "./components";
import { useState } from "react";

const Dashboard = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  const { error: devicesErr, isLoading: isLoadingDevices } = useApi<{
    devices: Device[];
  }>("/api/devices", (res) => {
    setDevices(res?.devices as Device[]);
  });

  const {
    response: scenesRes,
    error: scenesErr,
    isLoading: isLoadingScenes,
  } = useApi<{
    scenes: Scene[];
  }>("/api/scenes");

  const {
    response: roomsRes,
    error: roomsErr,
    isLoading: isLoadingRooms,
  } = useApi<{ rooms: Room[] }>("/api/rooms");

  const {
    response: usersRes,
    error: usersErr,
    isLoading: isLoadingUsers,
  } = useApi<{ users: User[] }>("/api/users");

  if (isLoadingDevices || isLoadingRooms || isLoadingUsers || isLoadingScenes)
    return <Loading />;
  if (devicesErr || roomsErr || usersErr || scenesErr) return <Error />;

  return (
    <>
      <GeneralDetails
        devices={devices || []}
        rooms={(roomsRes?.rooms as Room[]) || []}
        users={(usersRes?.users as User[]) || []}
      />
      <MostUsedDevices devices={devices || []} setDevices={setDevices} />
      <MostUsedScenes
        setDevices={setDevices}
        scenes={(scenesRes?.scenes as Scene[]) || []}
        devices={devices || []}
      />
    </>
  );
};

export default Dashboard;
