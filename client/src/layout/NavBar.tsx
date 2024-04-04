import React from "react";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "providers/AuthProvider";

interface INavBar {
  open: boolean;
  toggleDrawer: () => void;
}

const drawerWidth: number = 240;

const StyledNavBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const NavBar: React.FC<INavBar> = ({ open, toggleDrawer }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { logoutUser } = useAuth();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logoutUser();
  };

  return (
    <StyledNavBar position="absolute" open={open}>
      <Toolbar sx={{ pr: "24px" }}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={toggleDrawer}
          aria-label="open drawer"
          sx={{ marginRight: "36px", ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          noWrap
          variant="h6"
          component="h1"
          color="inherit"
          sx={{ flexGrow: 1 }}
        >
          Smart Home Control System
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit" onClick={handleClick}>
          <AccountCircle />
        </IconButton>
        <Menu
          id="navbar-menu"
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </StyledNavBar>
  );
};

export default NavBar;
