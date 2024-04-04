import React, { FC } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";

import { Scene } from "types";
import { deviceTypes } from "config";

interface IScenesTable {
  scenes: Scene[];
  handleDelete: (id: string) => void;
}

const ScenesTable: FC<IScenesTable> = ({ scenes, handleDelete }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="scenes table">
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
                <b>Manual</b>
              </TableCell>
              <TableCell align="left" width={200}>
                <b>Enabled</b>
              </TableCell>
              <TableCell align="left" width={200}>
                <b>Operations</b>
              </TableCell>
              <TableCell align="left" width={200}>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scenes.map((scene, idx) => (
              <TableRow
                key={scene._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{scene._id}</TableCell>
                <TableCell>{scene.name}</TableCell>
                <TableCell>{scene.manual ? "Yes" : "No"}</TableCell>
                <TableCell>{scene.enabled ? "Yes" : "No"}</TableCell>
                <TableCell>
                  {scene.actions.map((action) => {
                    const deviceTypeConfig = deviceTypes.find(
                      (deviceType) => deviceType.key === action.device?.type
                    );
                    return (
                      <>
                        <Typography variant="subtitle2">
                          {action.device?.name || ""} -{" "}
                          {action.value
                            ? deviceTypeConfig?.onMessage || "On"
                            : deviceTypeConfig?.offMessage || "Off"}
                        </Typography>
                      </>
                    );
                  })}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(scene._id)}>
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

export default ScenesTable;
