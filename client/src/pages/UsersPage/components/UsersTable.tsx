import React, { FC } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { User } from "types";

interface IUsersTable {
  users: User[];
  handleEdit: (user: User) => void;
  handleDelete: (id: string) => void;
}

const UsersTable: FC<IUsersTable> = ({ users, handleEdit, handleDelete }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell align="left" width={100}>
                <b>Nr. crt.</b>
              </TableCell>
              <TableCell align="left" width={300}>
                <b>Id</b>
              </TableCell>
              <TableCell align="left" width={200}>
                <b>Username</b>
              </TableCell>
              <TableCell align="left" width={200}>
                <b>Role</b>
              </TableCell>
              <TableCell align="left" width={200}>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, idx) => (
              <TableRow
                key={user._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(user)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user._id)}>
                    <DeleteIcon color="primary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersTable;
