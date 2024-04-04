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

import { Device } from "types";
import { deviceTypes } from "config";
import { Typography } from "@mui/material";

interface IDevicesTable {
  devices: Device[];
  handleEdit: (device: Device) => void;
  handleDelete: (id: string) => void;
}

const DevicesTable: FC<IDevicesTable> = ({
  devices,
  handleEdit,
  handleDelete,
}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="devices table">
          <TableHead>
            <TableRow>
              <TableCell align="left" width={30}>
                <b>Nr.</b>
              </TableCell>
              <TableCell align="left" width={300}>
                <b>Id</b>
              </TableCell>
              <TableCell align="left" width={50}>
                <b>Icon</b>
              </TableCell>
              <TableCell align="left" width={200}>
                <b>Name</b>
              </TableCell>
              <TableCell align="left" width={200}>
                <b>Type</b>
              </TableCell>
              <TableCell align="left" width={200}>
                <b>Version</b>
              </TableCell>
              <TableCell align="left" width={200}>
                <b>Status</b>
              </TableCell>
              <TableCell align="left" width={200}>
                <b>Room</b>
              </TableCell>
              <TableCell align="left" width={200}>
                <b>Connected</b>
              </TableCell>
              <TableCell align="left" width={200}>
                <b>Added by</b>
              </TableCell>
              <TableCell align="left" width={200}>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {devices.map((device, idx) => {
              const deviceTypeConfig = deviceTypes.find(
                (deviceType) => deviceType.key === device.type
              );

              return (
                <TableRow
                  key={device._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{device._id}</TableCell>
                  <TableCell>
                    {deviceTypeConfig?.icon && deviceTypeConfig.icon}
                  </TableCell>
                  <TableCell>{device.name}</TableCell>
                  <TableCell>
                    {deviceTypes.find(
                      (deviceType) => deviceType.key === device.type
                    )?.name || "-"}
                  </TableCell>
                  <TableCell>{device.version}</TableCell>
                  <TableCell>
                    {device.status
                      ? deviceTypeConfig?.onMessage || "On"
                      : deviceTypeConfig?.offMessage || "Off"}
                  </TableCell>
                  <TableCell>
                    {!!device?.room ? device.room.name : "-"}
                  </TableCell>
                  <TableCell>
                    {device.connected === false ? (
                      <Typography color="error" variant="body2">
                        ❌ Not connected
                      </Typography>
                    ) : (
                      <Typography color="#22B432" variant="body2">
                        ✅ Connected
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>{device.createdBy?.username}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(device)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(device._id)}>
                      <DeleteIcon color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DevicesTable;
