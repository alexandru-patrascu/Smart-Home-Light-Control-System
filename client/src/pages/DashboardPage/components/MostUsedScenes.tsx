import React, { FC } from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

import { Device, Scene } from "types";
import axios, { AxiosResponse } from "axios";

const { REACT_APP_API_URL } = process.env;

interface MostUsedScenesProps {
  scenes: Scene[];
  devices: Device[];
  setDevices: (devices: Device[]) => void;
}

const MostUsedScenes: FC<MostUsedScenesProps> = ({
  scenes,
  devices: prevDevices,
  setDevices,
}) => {
  const mostUsedScenes = scenes.slice(0, 12);

  const paperProps = {
    elevation: 2,
    sx: {
      p: 2,
      height: 100,
      display: "flex",
      cursor: "pointer",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
  };

  const handleClick = async (sceneId: string) => {
    const response: AxiosResponse<{ updatedDevices: Device[] }> =
      await axios.patch(`${REACT_APP_API_URL}/api/scenes/${sceneId}/trigger`);

    const updatedDevices = response.data.updatedDevices;

    setDevices(updatedDevices);
  };

  return (
    <>
      <Typography variant="h6" pb={2} px={3}>
        <b>Most Used Scenes</b>
      </Typography>
      <Grid container spacing={3} mb={3}>
        {mostUsedScenes.map((scene) => {
          return (
            <Grid item xs={12} sm={6} md={3} lg={3} key={scene._id}>
              <Paper {...paperProps} onClick={() => handleClick(scene._id)}>
                <Typography variant="subtitle1" py={1}>
                  {scene.name}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default MostUsedScenes;
