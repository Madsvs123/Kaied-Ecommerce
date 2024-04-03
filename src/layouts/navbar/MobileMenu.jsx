import { MenuItem, MenuList, colors } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { useTheme } from "@emotion/react";
import { useSelector, useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { setLogOut } from "../../state/auth";
import { useState } from "react";

const MobileMenu = () => {
  const { palette } = useTheme();
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <FlexBetween
      flexDirection="column"
      sx={{
        position: "absolute",
        top: "4rem",
        right: "0",
        width: "100%",
        backgroundColor: palette.background.alt,
        color: palette.neutral.dark,
      }}
    >
      <MenuList>
        <MenuItem>
          <PersonIcon sx={{ mr: ".5rem" }} />
          {user.username}
        </MenuItem>
        <MenuItem>
          <SettingsIcon sx={{ mr: ".5rem" }} />
          Setting
        </MenuItem>
        <MenuItem>
          <ShoppingCartIcon sx={{ mr: ".5rem" }} />
          Cart
          <span
            style={{
              position: "absolute",
              top: "-3px",
              left: "1.8rem",
              padding: "1px 2px",
              borderRadius: "10px",
              fontSize: ".8rem",
              backgroundColor: palette.primary.main,
              color: palette.neutral.dark,
            }}
          >
            {cart.length}
          </span>
        </MenuItem>
        <MenuItem>
          <FavoriteIcon sx={{ mr: ".5rem" }} />
          Favourite
        </MenuItem>
        <MenuItem onClick={() => dispatch(setLogOut())}>
          <LogoutIcon sx={{ mr: ".5rem" }} />
          Log Out
        </MenuItem>
      </MenuList>
    </FlexBetween>
  );
};

export default MobileMenu;
