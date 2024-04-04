import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";

import { Room } from "types";
import useApi from "hooks/useApi";
import { Error, Modal, Loading, PageTitle, NoDataFound } from "components";

import RoomsTable from "./components/RoomsTable";

const { REACT_APP_API_URL } = process.env;

const RoomsPage = () => {
  const [createRoomModal, setCreateRoomModal] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);

  const onSuccess = (res: { rooms: Room[] }) => {
    setRooms(res.rooms);
  };

  const { response, error, isLoading } = useApi("/api/rooms", onSuccess);

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  if (!response) return <NoDataFound />;

  const showModal = () => {
    setCreateRoomModal(true);
  };

  const closeModal = () => {
    setCreateRoomModal(false);
  };

  const showEditModal = (room: Room) => {
    setSelectedRoom(room);
  };

  const closeEditModal = () => {
    setSelectedRoom(null);
  };

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name") as string;

      const { data } = await axios.post<{ room: Room }>(
        `${REACT_APP_API_URL}/api/rooms`,
        {
          name,
          createdBy: JSON.parse(localStorage.getItem("user") as string)._id,
        }
      );

      setRooms((prevRooms) => [...prevRooms, data.room]);
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

      if (!selectedRoom) return;

      const { data } = await axios.patch<{ room: Room }>(
        `${REACT_APP_API_URL}/api/rooms/${selectedRoom._id}`,
        {
          name,
        }
      );

      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room._id === data.room._id ? { ...data.room } : room
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
      await axios.delete(`${REACT_APP_API_URL}/api/rooms/${id}`);
      setRooms((prevRooms) => prevRooms.filter((room) => room._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageTitle title="Rooms" buttonText="Add Room" handleClick={showModal} />
      <RoomsTable
        rooms={rooms}
        handleEdit={showEditModal}
        handleDelete={handleDelete}
      />
      <Modal
        key="create"
        title="Add Room"
        onSubmit={handleCreate}
        open={createRoomModal}
        handleClose={closeModal}
        contentText="Enter the name of the room you want to add."
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
      </Modal>
      <Modal
        key="edit"
        title="Edit Room"
        open={!!selectedRoom}
        onSubmit={handleUpdate}
        handleClose={closeEditModal}
        contentText="Enter the new name of the room."
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
          defaultValue={selectedRoom?.name}
        />
      </Modal>
    </>
  );
};

export default RoomsPage;
