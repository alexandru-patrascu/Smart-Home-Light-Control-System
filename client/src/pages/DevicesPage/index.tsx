import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import useApi from "hooks/useApi";
import { deviceTypes } from "config";
import { Device, Room } from "types";
import { Error, Modal, Loading, PageTitle, NoDataFound } from "components";

import DevicesTable from "./components/DevicesTable";
import { Slider } from "@mui/material";

const { REACT_APP_API_URL } = process.env;

const DevicesPage = () => {
  const [createDeviceModal, setCreateDeviceModal] = useState<boolean>(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);

  const onDevicesSuccess = (res: { devices: Device[] }) => {
    setDevices(res.devices);
  };

  const onRoomsSuccess = (res: { rooms: Room[] }) => {
    setRooms(res.rooms);
  };

  const { error: errDevices, isLoading: isLoadingDevices } = useApi(
    "/api/devices",
    onDevicesSuccess
  );

  const { error: errRooms, isLoading: isLoadingRooms } = useApi(
    "/api/rooms",
    onRoomsSuccess
  );

  if (isLoadingDevices || isLoadingRooms) return <Loading />;
  if (errDevices || errRooms) return <Error />;
  if (!devices) return <NoDataFound />;

  const showModal = () => {
    setCreateDeviceModal(true);
  };

  const closeModal = () => {
    setCreateDeviceModal(false);
  };

  const showEditModal = (device: Device) => {
    setSelectedDevice(device);
  };

  const closeEditModal = () => {
    setSelectedDevice(null);
  };

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name") as string;
      const type = formData.get("type") as string;
      const room = (formData.get("room") as string) || null;
      const brightness = formData.get("brightness") as string;

      const { data } = await axios.post<{ device: Device }>(
        `${REACT_APP_API_URL}/api/devices`,
        {
          name,
          type,
          room,
          brightness: parseInt(brightness),
          createdBy: JSON.parse(window.localStorage.getItem("user") as string)
            ?._id,
        }
      );

      setDevices((prevDevices) => [...prevDevices, data.device]);
    } catch (error) {
      console.error(error);
    } finally {
      closeModal();
    }
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name") as string;
      const room = (formData.get("room") as string) || null;
      const brightness = formData.get("brightness") as string;

      if (!selectedDevice) return;

      const { data } = await axios.patch<{ device: Device }>(
        `${REACT_APP_API_URL}/api/devices/${selectedDevice._id}`,
        {
          name,
          room,
          brightness: parseInt(brightness),
        }
      );

      setDevices((prevDevices) =>
        prevDevices.map((device) =>
          device._id === data.device._id ? { ...data.device } : device
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      closeEditModal();
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${REACT_APP_API_URL}/api/devices/${id}`);
      setDevices((prevDevices) =>
        prevDevices.filter((device) => device._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageTitle
        title="Devices"
        buttonText="Add Device"
        handleClick={showModal}
      />
      <DevicesTable
        devices={devices}
        handleEdit={showEditModal}
        handleDelete={handleDelete}
      />
      <Modal
        key="create"
        title="Add Device"
        onSubmit={handleCreate}
        open={createDeviceModal}
        handleClose={closeModal}
        contentText="Fill in the details of the new device."
      >
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
        />
        <FormControl fullWidth variant="standard">
          <InputLabel id="type">Type</InputLabel>
          <Select labelId="type" id="type" label="Type" name="type">
            {deviceTypes.map((deviceType) => (
              <MenuItem key={deviceType.key} value={deviceType.key}>
                {deviceType.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="standard">
          <InputLabel id="room">Room</InputLabel>
          <Select labelId="room" id="room" label="Room" name="room">
            {rooms.map((room: Room) => (
              <MenuItem key={room._id} value={room._id}>
                {room.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="standard">
          <InputLabel id="brightness">Brightness</InputLabel>
          <Slider
            sx={{ mt: 6 }}
            id="brightness"
            name="brightness"
            aria-label="Brightness level"
            defaultValue={50}
            getAriaValueText={(value) => `${value}%`}
            valueLabelDisplay="auto"
            shiftStep={10}
            step={10}
            min={0}
            max={100}
            marks={[
              {
                value: 0,
                label: "0%",
              },
              {
                value: 50,
                label: "50%",
              },
              {
                value: 100,
                label: "100%",
              },
            ]}
          />
        </FormControl>
      </Modal>
      <Modal
        key="edit"
        title="Edit Device"
        open={!!selectedDevice}
        onSubmit={handleUpdate}
        handleClose={closeEditModal}
        contentText="Fill in the updated details of the device."
      >
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={selectedDevice?.name}
        />
        <FormControl fullWidth variant="standard">
          <InputLabel id="room">Room</InputLabel>
          <Select
            labelId="room"
            id="room"
            label="Room"
            name="room"
            defaultValue={selectedDevice?.room?._id}
          >
            {rooms.map((room: Room) => (
              <MenuItem key={room._id} value={room._id}>
                {room.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="standard">
          <InputLabel id="brightness">Brightness</InputLabel>
          <Slider
            sx={{ mt: 6 }}
            id="brightness"
            name="brightness"
            aria-label="Brightness level"
            defaultValue={selectedDevice?.brightness}
            getAriaValueText={(value) => `${value}%`}
            valueLabelDisplay="auto"
            shiftStep={10}
            step={10}
            min={0}
            max={100}
            marks={[
              {
                value: 0,
                label: "0%",
              },
              {
                value: 50,
                label: "50%",
              },
              {
                value: 100,
                label: "100%",
              },
            ]}
          />
        </FormControl>
      </Modal>
    </>
  );
};

export default DevicesPage;
