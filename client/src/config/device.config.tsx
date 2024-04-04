import React from "react";
import {
  Lightbulb as LightIcon,
  PowerSettingsNew as SwitchIcon,
  SensorDoor as DoorSensorIcon,
  Thermostat as TemperatureSensorIcon,
  DirectionsRun as MotionSensorIcon,
  Videocam as CameraIcon,
  Power as PlugIcon,
  Lock as SmartLockIcon,
  Speaker as SmartSpeakerIcon,
} from "@mui/icons-material";

export const deviceTypes = [
  {
    name: "Light",
    key: "light",
    icon: <LightIcon color="primary" fontSize="large" />,
    clickable: true,
  },
  {
    name: "Switch",
    key: "switch",
    icon: <SwitchIcon color="primary" fontSize="large" />,
    clickable: true,
  },
  {
    name: "Door Sensor",
    key: "door-sensor",
    icon: <DoorSensorIcon color="primary" fontSize="large" />,
    clickable: false,
    onMessage: "Door Open",
    offMessage: "Door Closed",
  },
  {
    name: "Temperature Sensor",
    key: "temperature-sensor",
    icon: <TemperatureSensorIcon color="primary" fontSize="large" />,
    clickable: false,
    onMessage: "30.5°C / 41%RH",
    offMessage: "30.5°C / 41%RH",
  },
  {
    name: "Motion Sensor",
    key: "motion-sensor",
    icon: <MotionSensorIcon color="primary" fontSize="large" />,
    clickable: false,
    onMessage: "Motion Detected",
    offMessage: "No Motion Detected",
  },
  {
    name: "Camera",
    key: "camera",
    icon: <CameraIcon color="primary" fontSize="large" />,
    clickable: true,
    onMessage: "Recording",
    offMessage: "Not Recording",
  },
  {
    name: "Plug",
    key: "plug",
    icon: <PlugIcon color="primary" fontSize="large" />,
    clickable: true,
  },
  {
    name: "Smart Lock",
    key: "smart-lock",
    icon: <SmartLockIcon color="primary" fontSize="large" />,
    clickable: true,
    onMessage: "Door Locked",
    offMessage: "Door Unlocked",
  },
  {
    name: "Smart Speaker",
    key: "smart-speaker",
    icon: <SmartSpeakerIcon color="primary" fontSize="large" />,
    clickable: true,
  },
];
