import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Typography,
  useMediaQuery,
  Paper,
} from "@mui/material";

import { Add } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

// ====================================
// ======= Get Products Number =========
// ====================================

const ProductsNumber = ({ id }) => {
  const [products, setProducts] = useState(null);
  const getProducts = async () => {
    await axios
      .get(`http://localhost:3001/subcategory/${id}/product`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return <span>{products && products.length}</span>;
};

// ====================================
// ======= Set Category Table =========
// ====================================

const Category = () => {
  const [categories, setCategories] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();

  const getCategories = async () => {
    await axios
      .get("http://localhost:3001/category")
      .then((res) => setCategories(res.data.categories))
      .catch((err) => console.log(err));
  };

  const deleteCategory = async (id) => {
    await axios
      .delete(`http://localhost:3001/category/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <Box>
      <Box
        m="1rem 0"
        p="1rem"
        component={Paper}
        display="flex"
        justifyContent="space-between"
      >
        <Typography
          variant="h2"
          fontWeight={500}
          sx={{ color: palette.neutral.dark }}
        >
          Categories
        </Typography>
        <Button
          variant="outlined"
          color="info"
          onClick={() => navigate("/admin/category/add")}
          sx={{ p: ".5rem 1rem" }}
        >
          Add Category <Add />
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ p: "1rem" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight={700} textAlign="center" fontSize="1rem">
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={700} textAlign="center" fontSize="1rem">
                  Description
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={700} textAlign="center" fontSize="1rem">
                  Options
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories &&
              categories.map((category) => {
                return (
                  <TableRow key={category._id}>
                    <TableCell sx={{ color: palette.primary.dark }}>
                      <Typography textAlign="center">
                        {category.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography textAlign="center">
                        {category.description}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="info"
                        onClick={() =>
                          navigate(`/admin/category/${category._id}/add`)
                        }
                      >
                        Add SubCategory
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => console.log("Edit Category")}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteCategory(category._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box m="1rem 0" p="1rem" component={Paper}>
        <Typography
          variant="h2"
          fontWeight={500}
          sx={{ color: palette.neutral.dark }}
        >
          Sub-Categories
        </Typography>
      </Box>
      <SubCategory />
    </Box>
  );
};

// ====================================
// ======= Set Sub-Category Table =========
// ====================================

const SubCategory = () => {
  const [subCategories, setSubCategories] = useState(null);
  const [categories, setCategories] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();

  const getSubCategories = async () => {
    await axios
      .get("http://localhost:3001/category")
      .then((res) => {
        setSubCategories(res.data.subCategories);
        setCategories(res.data.categories);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSubCategories();
  }, []);
  return (
    <TableContainer component={Paper} sx={{ p: "1rem", m: "1rem 0" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography fontWeight={700} textAlign="center" fontSize="1rem">
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography fontWeight={700} textAlign="center" fontSize="1rem">
                Category
              </Typography>
            </TableCell>
            <TableCell>
              <Typography fontWeight={700} textAlign="center" fontSize="1rem">
                Products Number
              </Typography>
            </TableCell>
            <TableCell>
              <Typography fontWeight={700} textAlign="center" fontSize="1rem">
                Options
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subCategories &&
            categories &&
            subCategories.map((subCategory) => {
              categories.map((category) => {
                if (subCategory.category === category._id) {
                  return (subCategory.category = category.name);
                }
                return null;
              });

              return (
                <TableRow key={subCategory._id}>
                  <TableCell sx={{ color: palette.primary.dark }}>
                    <Typography textAlign="center">
                      {subCategory.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography textAlign="center">
                      {subCategory.category}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography textAlign="center">
                      <ProductsNumber id={subCategory._id} />
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "1rem",
                    }}
                  >
                    <Button variant="contained" color="success">
                      Edit
                    </Button>
                    <Button variant="contained" color="error">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Category;
