import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";

import { User } from "types";
import useApi from "hooks/useApi";
import { Error, Modal, Loading, PageTitle, NoDataFound } from "components";

import UsersTable from "./components/UsersTable";

const { REACT_APP_API_URL } = process.env;

const UsersPage = () => {
  const [createUserModal, setCreateUserModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const onSuccess = (res: { users: User[] }) => {
    if (!users.length) {
      setUsers(res.users);
    }
  };

  const { error, isLoading } = useApi("/api/users", onSuccess);

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  if (!users) return <NoDataFound />;

  const showModal = () => {
    setCreateUserModal(true);
  };

  const closeModal = () => {
    setCreateUserModal(false);
  };

  const showEditModal = (user: User) => {
    setSelectedUser(user);
  };

  const closeEditModal = () => {
    setSelectedUser(null);
  };

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const username = formData.get("username") as string;

      const { data } = await axios.post<{ user: User }>(
        `${REACT_APP_API_URL}/api/users`,
        {
          username,
        }
      );

      setUsers((prevUsers) => [...prevUsers, data.user]);
    } catch (error) {
      console.error(error);
    } finally {
      closeModal();
    }
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      const formData = new FormData(event.currentTarget);
      const username = formData.get("username") as string;

      if (!selectedUser) return;

      const { data } = await axios.patch<{ user: User }>(
        `${REACT_APP_API_URL}/api/users/${selectedUser._id}`,
        {
          username,
        }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === data.user._id ? { ...data.user } : user
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
      await axios.delete(`${REACT_APP_API_URL}/api/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageTitle title="Users" buttonText="Add User" handleClick={showModal} />
      <UsersTable
        users={users}
        handleEdit={showEditModal}
        handleDelete={handleDelete}
      />
      <Modal
        key="create"
        title="Add User"
        onSubmit={handleCreate}
        open={createUserModal}
        handleClose={closeModal}
        contentText="Enter the username of the user you want to add."
      >
        <TextField
          autoFocus
          required
          margin="dense"
          id="username"
          name="username"
          label="Username"
          type="text"
          fullWidth
          variant="standard"
        />
      </Modal>
      <Modal
        key="edit"
        title="Edit User"
        open={!!selectedUser}
        onSubmit={handleUpdate}
        handleClose={closeEditModal}
        contentText="Enter the new username of the user."
      >
        <TextField
          autoFocus
          required
          margin="dense"
          id="username"
          name="username"
          label="Username"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={selectedUser?.username}
        />
      </Modal>
    </>
  );
};

export default UsersPage;
