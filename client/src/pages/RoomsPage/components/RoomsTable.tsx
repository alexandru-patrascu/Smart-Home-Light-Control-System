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

import { Room } from "types";

interface IRoomsTable {
  rooms: Room[];
  handleEdit: (room: Room) => void;
  handleDelete: (id: string) => void;
}

const RoomsTable: FC<IRoomsTable> = ({ rooms, handleEdit, handleDelete }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="rooms table">
          <TableHead>
            <TableRow>
              <TableCell align="left" width={100}>
                <b>Nr. crt.</b>
              </TableCell>
              <TableCell align="left" width={300}>
                <b>Id</b>
              </TableCell>
              <TableCell align="left" width={200}>
                <b>Name</b>
              </TableCell>
              <TableCell align="left" width={200}>
                <b>Nr. of devices</b>
              </TableCell>
              <TableCell align="left" width={200}>
                <b>Created By</b>
              </TableCell>
              <TableCell align="left" width={100}>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room, idx) => (
              <TableRow
                key={room._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{room._id}</TableCell>
                <TableCell>{room.name}</TableCell>
                <TableCell>{room?.numberOfDevices}</TableCell>
                <TableCell>{room.createdBy?.username}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(room)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(room._id)}>
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

export default RoomsTable;
