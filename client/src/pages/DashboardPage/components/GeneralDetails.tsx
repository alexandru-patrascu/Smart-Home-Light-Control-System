import React, { FC } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

import { Device, Room, User } from "types";

interface GeneralDetailsProps {
  devices: Device[];
  rooms: Room[];
  users: User[];
}

const GeneralDetails: FC<GeneralDetailsProps> = ({ devices, rooms, users }) => {
  const connectedDevices = devices.filter((device) => device.connected);
  const notConnectedDevices = devices.filter((device) => !device.connected);

  const paperProps = {
    elevation: 2,
    sx: {
      p: 2,
      height: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
  };

  return (
    <>
      <Typography variant="h6" pb={2} px={3}>
        <b>Dashboard</b>
      </Typography>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Paper {...paperProps}>
            <Typography variant="subtitle1" pb={2}>
              Connected devices
            </Typography>
            <Typography variant="subtitle1">
              {connectedDevices.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Paper {...paperProps}>
            <Typography variant="subtitle1" pb={2}>
              Not Connected devices
            </Typography>
            <Typography variant="subtitle1" color="error">
              {notConnectedDevices.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Paper {...paperProps}>
            <Typography variant="subtitle1" pb={2}>
              Rooms assigned
            </Typography>
            <Typography variant="subtitle1">{rooms.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Paper {...paperProps}>
            <Typography variant="subtitle1" pb={2}>
              Number of Users
            </Typography>
            <Typography variant="subtitle1">{users.length}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default GeneralDetails;
