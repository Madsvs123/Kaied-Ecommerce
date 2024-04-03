import * as React from "react";
import { useTheme } from "@emotion/react";
import {
  Box,
  List,
  Typography,
  ListItem,
  Divider,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import InventoryIcon from "@mui/icons-material/Inventory";
import GroupIcon from "@mui/icons-material/Group";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Home } from "@mui/icons-material";
import { Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const AdminSideBar = () => {
  const { palette } = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width: 850px)");
  const [anchor, setAnchor] = React.useState("left");
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    top: false,
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //     return;
    //   }
    setState({ ...state, [anchor]: open });
  };

  const screenChange = (isNonMobileScreen) => {
    if (isNonMobileScreen) {
      return setAnchor("left");
    }
    return setAnchor("top");
  };

  React.useEffect(() => {
    screenChange(isNonMobileScreen);
  }, [isNonMobileScreen]);

  const list = (anchor) => {
    const MainLinks = [
      {
        label: "Dashboard",
        navigate: "/admin",
        icon: (
          <DashboardIcon
            sx={{ fontSize: "1rem", mr: "1rem", color: palette.primary.main }}
          />
        ),
      },
      {
        label: "Products",
        navigate: "/admin/product",
        icon: (
          <InventoryIcon
            sx={{ fontSize: "1rem", mr: "1rem", color: palette.primary.main }}
          />
        ),
      },
      {
        label: "Customers",
        navigate: "/admin/customer",
        icon: (
          <GroupIcon
            sx={{ fontSize: "1rem", mr: "1rem", color: palette.primary.main }}
          />
        ),
      },
      {
        label: "Setting",
        navigate: "/admin/setting",
        icon: (
          <SettingsIcon
            sx={{ fontSize: "1rem", mr: "1rem", color: palette.primary.main }}
          />
        ),
      },
      {
        label: "Home",
        navigate: "/",
        icon: (
          <Home
            sx={{ fontSize: "1rem", mr: "1rem", color: palette.primary.main }}
          />
        ),
      },
      {
        label: "Logout",
        navigate: "",
        icon: (
          <LogoutIcon
            sx={{ fontSize: "1rem", mr: "1rem", color: palette.primary.main }}
          />
        ),
      },
    ];

    return (
      <Box
        sx={{
          width: anchor === "top" ? "auto" : 250,
        }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {MainLinks.map((link, index) => (
            <ListItem
              key={link.label}
              disablePadding
              onClick={() => {
                navigate(link.navigate);
              }}
            >
              <ListItemButton>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  return (
    <div
      style={{
        backgroundColor: palette.neutral.dark,
        boxShadow: "1px 0 5px 2px rgba(0, 0, 0, .1)",
      }}
    >
      <React.Fragment key={anchor}>
        <Box fontSize="1rem" sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={toggleDrawer(anchor, true)} color="primary">
            <Menu sx={{ fontSize: "2rem" }} />
          </IconButton>
          <Typography>
            <AdminPanelSettingsIcon sx={{ fontSize: "1.4rem" }} />{" "}
            {user.username}
          </Typography>
        </Box>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          variant="temporary"
          PaperProps={{
            sx: {
              backgroundColor: palette.neutral.dark,
              color: palette.neutral.light,
            },
          }}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default AdminSideBar;
