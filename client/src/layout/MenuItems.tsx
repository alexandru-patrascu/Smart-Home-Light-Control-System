import React, { FC, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import HouseIcon from "@mui/icons-material/House";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

const MenuItems: FC = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <ListItemButton onClick={() => navigate("/dashboard")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/users")}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/devices")}>
        <ListItemIcon>
          <LightbulbIcon />
        </ListItemIcon>
        <ListItemText primary="Devices" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/rooms")}>
        <ListItemIcon>
          <HouseIcon />
        </ListItemIcon>
        <ListItemText primary="Rooms" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/scenes")}>
        <ListItemIcon>
          <IntegrationInstructionsIcon />
        </ListItemIcon>
        <ListItemText primary="Scenes" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/reports")}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/energy-consumption")}>
        <ListItemIcon>
          <EnergySavingsLeafIcon />
        </ListItemIcon>
        <ListItemText primary="Energy Consumption" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/integrations")}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItemButton>
    </Fragment>
  );
};

export default MenuItems;
