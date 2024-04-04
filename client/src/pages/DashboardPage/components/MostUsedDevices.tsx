import React, { FC } from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

import { Device } from "types";
import { deviceTypes } from "config";
import axios from "axios";

const { REACT_APP_API_URL } = process.env;

interface MostUsedDevicesProps {
  devices: Device[];
  setDevices: (devices: Device[]) => void;
}

const MostUsedDevices: FC<MostUsedDevicesProps> = ({ devices, setDevices }) => {
  const mostUsedDevices = devices.slice(0, 12);

  const getPaperProps = (clickable: boolean) => {
    return {
      elevation: 2,
      sx: {
        p: 2,
        height: 100,
        display: "flex",
        cursor: clickable ? "pointer" : "default",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      },
    };
  };

  const handleClick = async (deviceId: string) => {
    // Add the toggle device functionality here
    const updatedDevice = await axios.patch(
      `${REACT_APP_API_URL}/api/devices/${deviceId}/toggle`
    );

    const updatedDevices = devices.map((device) =>
      device._id === deviceId ? updatedDevice.data.device : device
    );

    setDevices(updatedDevices);
  };

  return (
    <>
      <Typography variant="h6" pb={2} px={3}>
        <b>Most Used Devices</b>
      </Typography>
      <Grid container spacing={3} mb={3}>
        {mostUsedDevices.map((device) => {
          const deviceTypeConfig = deviceTypes.find(
            (deviceType) => deviceType.key === device.type
          );

          const handleDeviceClick = () => {
            if (deviceTypeConfig?.clickable) {
              handleClick(device._id);
            }
          };

          const paperProps = getPaperProps(!!deviceTypeConfig?.clickable);

          return (
            <Grid item xs={12} sm={6} md={3} lg={3} key={device._id}>
              <Paper {...paperProps} onClick={handleDeviceClick}>
                {deviceTypeConfig?.icon}
                <Typography variant="subtitle1" py={1}>
                  {device.name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color={!!device.status ? "#22B432" : "inherit "}
                >
                  <b>
                    {!!device.status
                      ? deviceTypeConfig?.onMessage || "On"
                      : deviceTypeConfig?.offMessage || "Off"}
                  </b>
                  {deviceTypeConfig?.key === "light" && (
                    <span> - {device.brightness}% brightness</span>
                  )}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default MostUsedDevices;
