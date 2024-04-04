import { Fragment, useState } from "react";
import axios from "axios";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Typography } from "@mui/material";

import useApi from "hooks/useApi";
import { Action, Device, Scene } from "types";
import { Error, Modal, Loading, PageTitle, NoDataFound } from "components";

import ScenesTable from "./components/ScenesTable";

const { REACT_APP_API_URL } = process.env;

const ScenesPage = () => {
  const [createSceneModal, setCreateSceneModal] = useState<boolean>(false);
  const [tempActions, setTempActions] = useState<Action[]>([]);

  const [scenes, setScenes] = useState<Scene[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);

  const onSuccessScenes = (res: { scenes: Scene[] }) => {
    setScenes(res.scenes);
  };

  const onSuccessDevices = (res: { devices: Device[] }) => {
    setDevices(res.devices);
  };

  const { error, isLoading } = useApi("/api/scenes", onSuccessScenes);
  const { error: errDevices, isLoading: isLoadingDevices } = useApi(
    "/api/devices",
    onSuccessDevices
  );

  if (isLoading || isLoadingDevices) return <Loading />;
  if (error || errDevices) return <Error />;
  if (!scenes) return <NoDataFound />;

  const showModal = () => {
    setCreateSceneModal(true);
  };

  const closeModal = () => {
    setTempActions([]);
    setCreateSceneModal(false);
  };

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name") as string;
      const manual = formData.get("manual") as string;
      const enabled = formData.get("enabled") as string;
      const actions = formData.getAll("device").map((device, idx) => {
        return {
          device: devices.find((d) => d._id === device),
          value: formData.getAll("value")[idx],
        };
      });

      const { data } = await axios.post<{ scene: Scene }>(
        `${REACT_APP_API_URL}/api/scenes`,
        {
          name,
          manual: !!(manual === "true"),
          enabled: !!(enabled === "true"),
          actions,
          createdBy: JSON.parse(window.localStorage.getItem("user") as string)
            ?._id,
        }
      );

      setScenes((prevScenes) => [...prevScenes, data.scene]);
    } catch (error) {
      console.error(error);
    } finally {
      closeModal();
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${REACT_APP_API_URL}/api/scenes/${id}`);
      setScenes((prevScenes) => prevScenes.filter((scene) => scene._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddNewAction = () => {
    setTempActions((prevActions) => [
      ...prevActions,
      { device: devices[0], value: true },
    ]);
  };

  return (
    <>
      <PageTitle
        title="Scenes"
        buttonText="Add Scene"
        handleClick={showModal}
      />
      <ScenesTable scenes={scenes} handleDelete={handleDelete} />
      <Modal
        key="create"
        title="Add Scene"
        onSubmit={handleCreate}
        open={createSceneModal}
        handleClose={closeModal}
        contentText="Enter the details of the scene you want to add."
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
        <FormControl fullWidth variant="standard" sx={{ my: 2 }}>
          <FormGroup aria-label="position" row>
            <FormControlLabel
              sx={{ ml: 0 }}
              label="Trigger manually"
              labelPlacement="start"
              control={<Switch color="primary" />}
            />
            <FormControlLabel
              label="Enabled"
              labelPlacement="start"
              control={<Switch color="primary" />}
            />
          </FormGroup>
        </FormControl>
        <Divider sx={{ mb: 3 }} />
        {tempActions.map((action, idx) => {
          const handleDeviceChange = (event: SelectChangeEvent<Device>) => {
            const { value } = event.target;
            setTempActions((prevActions) =>
              prevActions.map((prevAction, i) =>
                i === idx
                  ? ({
                      ...prevAction,
                      device: devices.find((device) => device._id === value),
                    } as Action)
                  : prevAction
              )
            );
          };

          const handleStatusChange = (e: SelectChangeEvent<boolean>) => {
            const { value } = e.target;

            setTempActions((prevActions) =>
              prevActions.map((prevAction, i) =>
                i === idx
                  ? { ...prevAction, value: !!(value === "true") }
                  : prevAction
              )
            );
          };

          return (
            <Fragment key={idx}>
              <Typography variant="subtitle1" color="primary">
                <b>Action {idx + 1}</b>
              </Typography>
              <FormControl
                key={idx}
                fullWidth
                variant="standard"
                sx={{ mt: 1, mb: 2 }}
              >
                <InputLabel id="device">Device</InputLabel>
                <Select
                  labelId="device"
                  id="device"
                  name="device"
                  label="Device"
                  onChange={handleDeviceChange}
                  defaultValue={action.device}
                >
                  {devices.map((device) => {
                    return (
                      <MenuItem key={device._id} value={device._id}>
                        {device.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl
                key={idx}
                fullWidth
                variant="standard"
                sx={{ mb: 4 }}
              >
                <InputLabel id="device">Status</InputLabel>
                <Select
                  labelId="value"
                  id="value"
                  name="value"
                  label="Then: "
                  onChange={handleStatusChange}
                  defaultValue={action.value}
                >
                  <MenuItem value="true">ON</MenuItem>
                  <MenuItem value="false">OFF</MenuItem>
                </Select>
              </FormControl>
            </Fragment>
          );
        })}

        <IconButton type="button" onClick={handleAddNewAction}>
          <AddIcon color="primary" />
          <Typography variant="button" color="primary">
            Add Action
          </Typography>
        </IconButton>
      </Modal>
    </>
  );
};

export default ScenesPage;
