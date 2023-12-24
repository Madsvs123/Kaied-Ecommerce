import { useTheme } from "@emotion/react"
import { Button, 
         Table, 
         TableContainer,
         TableHead, 
         TableBody, 
         TableRow, 
         TableCell, 
         Typography,
         Box, 
         Select, 
         MenuItem, 
         FormControl, 
         InputAdornment, 
         OutlinedInput,
         InputLabel
        } from "@mui/material";
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Add, Category, Search, SearchOutlined } from "@mui/icons-material";
import { useSearchParams  } from 'react-router-dom'

const ProductsPanel = ({categories, subCategories}) => {
  const navigate = useNavigate()
  const { palette } = useTheme()
  const [searchParams, setSearchParams] = useSearchParams()

   const handleSearch = (e) => {
    if (e.target.value.trim() !== "") {
      searchParams.set('search' , e.target.value.trim())
    } else {
      searchParams.delete('search')
    }
      setSearchParams(searchParams)
   }

  return (
    <Box component={Paper} display="flex" mb="1rem" columnGap="1rem" p="1rem">
    <Button variant="outlined" color="info" onClick={() => navigate('/admin/product/add')} sx={{
     p : ".5rem 1rem",
   }}>
     Add Product <Add />
   </Button>
   <FormControl variant="outlined" size="small">
    <OutlinedInput size="small"
                   placeholder="Search" 
                   endAdornment={
                    <InputAdornment position="end">
                      <SearchOutlined />
                    </InputAdornment>
                   }
                   onChange={handleSearch}
                   />
   </FormControl>
    </Box>
  )
}

const AllProducts = () => {

  const [data, setData] = useState(null)
  const [categories, setCategories] = useState(null)
  const [tableMsg, setTableMsg] = useState(null)
  const navigate = useNavigate()
  const { palette } = useTheme()
  const [searchParams] = useSearchParams()

  const getQuery = () => {
    return "";
  }
  
  const getProducts = async() => {
     await axios.get(`http://localhost:3001/product${getQuery()}`).then(reponse => {setData(reponse.data)})
    }

    const getCategory = async() => {
      await axios.get(`http://localhost:3001/category`).then(reponse => {setCategories(reponse.data)})
     }

    useEffect(() => {
      getProducts()
      getCategory()
    } , [])

const DeleteProduct = async (id) => {
  await axios.delete(`http://localhost:3001/product/${id}`)
  getProducts()
}

  return (
    <div>
    <ProductsPanel />
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography fontWeight="800">
              Name
              </Typography>
              </TableCell>
            <TableCell align="center">
            <Typography fontWeight="800">
              Category
              </Typography>
              </TableCell>
              <TableCell align="center">
            <Typography fontWeight="800">
              Sub-Category
              </Typography>
              </TableCell>
              <TableCell align="center">
            <Typography fontWeight="800">
              Price
              </Typography>
              </TableCell>
              <TableCell align="center">
            <Typography fontWeight="800">
              Discount
              </Typography>
              </TableCell>
              <TableCell align="center">
            <Typography fontWeight="800">
              Quantity
              </Typography>
              </TableCell>
              <TableCell align="center">
            <Typography fontWeight="800">
              Time
              </Typography>
              </TableCell>
              <TableCell align="center">
            <Typography fontWeight="800">
              Options
              </Typography>
              </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && categories && data.products.map((product) => {

          categories.categories.map(category => category._id === product.category ? product.category = category.name : null)
          categories.subCategories.map(subCategory => subCategory._id === product.subCategory ? product.subCategory=subCategory.name : null)
            
            // Detect Time product added
            const date1 = new Date(product.createdAt)
            const date = Date.now() - date1
            const hours = Math.round(date / (3600000))
            const day = Math.round(hours / 24)
            var productTime
            if (day !== 0) {
             productTime = `${day} day ago`
            } else if (day === 0 && hours !== 0) {
              productTime = `${hours} hour ago`
            } else {
              productTime = `now`
            }

            // Return Product Info

            return (
              <TableRow key={product._id}>
              <TableCell align="center">
                <Typography fontWeight="500" 
                            sx={{color : palette.primary.dark, 
                            cursor : "pointer"}} 
                            onClick={() => navigate(`/product/${product._id}`)}>
                {product.name}
                </Typography>
              </TableCell>
              <TableCell align="center">{product.category}</TableCell>
              <TableCell align="center">{product.subCategory}</TableCell>
              <TableCell align="center">{product.price}</TableCell>
              <TableCell align="center">
                {product.discount ? (
                  <Typography>
                    25%
                  </Typography>
                ) : (
                <Typography>
                  null
                </Typography>
                ) }
              </TableCell>
              <TableCell align="center">{product.numOnStock}</TableCell>
              <TableCell align="center">{productTime}</TableCell>
              <TableCell sx={{display : "flex", justifyContent : "center", gap : "1rem"}}>
              <Button variant="contained"
                      color="success" 
                      onClick={() => navigate(`/admin/product/edit/${product._id}`)}
                      > 
                      Edit
                </Button>
                <Button variant="contained"
                        color="error" 
                        onClick={() => DeleteProduct(product._id)}> 
                      Delete
                </Button>
              </TableCell>
            </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default AllProducts