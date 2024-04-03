import { Box } from "@mui/material";
import Navbar from "../layouts/navbar/Navbar";
import Footer from "./Footer";
import { useTheme } from "@emotion/react";

const About = () => {
  const { palette } = useTheme();
  return (
    <Box>
      <Navbar />
      <div className="container">About</div>
      <Footer />
    </Box>
  );
};

export default About;
