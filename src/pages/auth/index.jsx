import { useTheme } from "@emotion/react";
import Login from "./login";
import Register from "./register";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAuthPageType } from "../../state/auth";
import LoginNav from "../../layouts/navbar/LoginNav";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Auth = () => {
  const pageType = useSelector((state) => state.auth.authPageType);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const inNonMobileScreen = useMediaQuery("(min-width : 800px)");
  const { palette } = useTheme();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <Box>
      <LoginNav />
      <Box
        width={inNonMobileScreen ? "40%" : "80%"}
        m="2rem auto"
        sx={{
          p: "2rem 3rem",
          borderRadius: "10px",
          backgroundColor: palette.background.alt,
        }}
      >
        <Box sx={{ mb: "1rem" }}>
          <Typography sx={{ display: "inline", color: palette.neutral.dark }}>
            Welcome To
          </Typography>
          <Typography
            sx={{
              p: "0 .5rem",
              color: palette.primary.main,
              display: "inline",
            }}
          >
            Kaied Market
          </Typography>
          <Typography sx={{ display: "inline", color: palette.neutral.dark }}>
            your favourite shopping website !
          </Typography>
        </Box>
        {isLogin ? <Login /> : <Register />}
        <Box mt="1rem">
          <Typography
            color={palette.neutral.dark}
            onClick={() => dispatch(setAuthPageType())}
            sx={{ cursor: "pointer" }}
          >
            {isLogin
              ? `Don't Have an Account ? Register Here`
              : `Have An Account ? Login Here`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;
