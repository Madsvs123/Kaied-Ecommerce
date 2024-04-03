import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  ButtonBase,
} from "@mui/material";
import Navbar from "../../layouts/navbar/Navbar";
import CategoryNav from "../../layouts/navbar/CategoryNav";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../layouts/sidebar/Sidebar";
import ProductCard from "../../components/ProductCard";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "../Footer";

const HomePage = () => {
  const [data, setData] = useState(null);
  const isTabletScreen = useMediaQuery("(max-width: 1024px)");
  const isMobileScreen = useMediaQuery("(max-width: 800px)");
  const [searchParams] = useSearchParams();
  const { palette } = useTheme();

  const query = window.location.search;

  const PageGridColumn = () => {
    if (isMobileScreen) {
      return "repeat(4, 1fr)";
    } else if (isTabletScreen && !isMobileScreen) {
      return "repeat(8, 1fr)";
    }
    return "repeat(9, 1fr)";
  };

  const getData = async () => {
    await axios
      .get(`http://localhost:3001/product${query}`)
      .then((reponse) => setData(reponse.data.products));
  };

  useEffect(() => {
    getData();
  }, [searchParams]);

  return (
    <Box>
      <Navbar />
      <CategoryNav />
      <Box>
        <div className="banner" style={{ width: "100%" }}>
          <div className="overlay"></div>
          <div className="container">
            <div className="info">
              <Typography fontSize="4rem" fontWeight="bold">
                Kaied Market
              </Typography>
              <Typography fontSize="2rem">
                We’re the online shopping experts. <br />
                Shop with us and get top quality products.
              </Typography>
              <button>Start Shopping Now</button>
            </div>
          </div>
        </div>
        <div className="container">
          <Box
            display="grid"
            gap="2rem"
            gridTemplateColumns="repeat(8, minmax(0, 1fr))"
          >
            <Sidebar />
            <Box
              gridColumn="span 6"
              display="grid"
              gap="1rem"
              gridTemplateColumns={PageGridColumn()}
            >
              {data &&
                data.map((product) => {
                  return (
                    <ProductCard
                      key={product._id}
                      id={product._id}
                      discount={product.discount}
                      name={product.name}
                      img={product.images[0].name}
                      price={product.price}
                      rate={product.rate}
                    />
                  );
                })}
            </Box>
          </Box>
        </div>
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
