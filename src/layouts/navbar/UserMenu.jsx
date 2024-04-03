import NavLink from "./NavLink";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useSelector, useDispatch } from "react-redux";
import { Button, Divider, MenuItem } from "@mui/material";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { setLogOut, setMode } from "../../state/auth";
import { useNavigate } from "react-router-dom";
import { updateCart } from "../../state/cart";

const UserMenu = () => {
  const user = useSelector((state) => state.auth.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Logout = () => {
    dispatch(setLogOut());
    dispatch(
      updateCart({
        cart: [],
      })
    );
    navigate("/login");
  };

  return (
    <div style={{ position: "relative", zIndex: "100" }}>
      <Button
        onClick={() => (menuOpen ? setMenuOpen(false) : setMenuOpen(true))}
        sx={{
          color: menuOpen ? palette.primary.main : palette.neutral.dark,
          pl: "1rem",
          letterSpacing: "1px",
        }}
      >
        <span style={{ fontSize: "1rem" }}>{user.username}</span>
        {menuOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </Button>
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            zIndex: "10",
            width: "100%",
            backgroundColor: palette.background.alt,
          }}
        >
          {user.isAdmin && (
            <>
              <MenuItem
                onClick={() => navigate("/admin")}
                sx={{ fontSize: "1rem", color: palette.neutral.dark }}
              >
                <AdminPanelSettingsIcon sx={{ mr: ".5rem" }} />
                <span>Admin</span>
              </MenuItem>
              <Divider />
            </>
          )}
          <MenuItem
            onClick={() => dispatch(setMode())}
            sx={{ fontSize: "1rem", color: palette.neutral.dark }}
          >
            <SettingsIcon sx={{ mr: ".5rem" }} />
            <span>Setting</span>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => Logout()}
            sx={{ fontSize: "1rem", color: palette.neutral.dark }}
          >
            <LogoutIcon sx={{ mr: ".5rem" }} />
            <span>Logout</span>
          </MenuItem>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
