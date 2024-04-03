import { Link, useTheme } from "@mui/material";
import styled from "@emotion/styled";

const NavLink = styled(Link)({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  cursor: "pointer",
  padding: "0 1rem",
});

export default NavLink;
