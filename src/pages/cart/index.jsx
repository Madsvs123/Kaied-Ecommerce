import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../layouts/navbar/Navbar";
import { Box, Typography, useMediaQuery, Button, Divider } from "@mui/material";
import CartItem from "../../components/CartItem";
import Footer from "../Footer";
import { useTheme } from "@emotion/react";

const CartPage = () => {
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart);
  const inNonMobileScreen = useMediaQuery("(min-width: 850px)");
  const { palette } = useTheme();

  return (
    <Box>
      <Navbar />
      <div className="container">
        {user ? (
          <Box
            p="2rem 0"
            display="grid"
            gridTemplateColumns={inNonMobileScreen ? "65% 35%" : "100%"}
            gap="1rem"
          >
            <Box display="flex" flexDirection="column" rowGap="1rem">
              {cart.cartItems.map((item) => {
                return (
                  <CartItem
                    key={item.product}
                    id={item.product}
                    quantity={item.quantity}
                    total={item.subTotal}
                  />
                );
              })}
            </Box>
            <Box
              sx={{
                backgroundColor: palette.neutral.dark,
                color: palette.neutral.light,
                height: "fit-content",
                borderRadius: "1rem",
                p: "1rem",
                boxShadow: "1px 1px 6px 2px rgba(0, 0, 0, .1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: ".5rem",
                }}
              >
                <Typography variant="h5">Shipping Cost</Typography>
                <Typography variant="h5" sx={{ color: palette.neutral.light }}>
                  {cart.total} USD
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: ".5rem",
                }}
              >
                <Typography variant="h5">Discount</Typography>
                <Typography variant="h5" sx={{ color: palette.neutral.light }}>
                  {cart.total} USD
                </Typography>
              </div>
              <Divider
                sx={{ backgroundColor: palette.neutral.light, m: "1rem 0" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "1rem 0",
                }}
              >
                <Typography variant="h4">Total</Typography>
                <Typography variant="h4" sx={{ color: palette.neutral.light }}>
                  {cart.total} USD
                </Typography>
              </div>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                p="1rem"
                sx={{ fontSize: "1rem", color: palette.neutral.dark }}
              >
                Purchase
              </Button>
            </Box>
          </Box>
        ) : (
          "Login to View Your Cart"
        )}
      </div>
      <Footer />
    </Box>
  );
};

export default CartPage;
