import { useTheme } from "@emotion/react"
import { Search } from "@mui/icons-material"
import { Box, 
         MenuList, 
         ListItem,
         Typography,
         TextField,
         Button,
         IconButton, 
        } from "@mui/material"
import axios from 'axios'
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import * as yup from 'yup'
import { useFormik } from "formik"

const validationSchema = yup.object().shape({
    minPrice : yup.number().min(0),
    maxPrice : yup.number().min(0).max(999999)
})

const Sidebar = () => {
    const { palette } = useTheme()
    const [categories, setCategories] = useState(null)
    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)
    const [searchParam , setSearchParams] = useSearchParams()

    const initialValues = {
        minPrice : minPrice ? minPrice : "",
        maxPrice : maxPrice ? maxPrice : ""
    }

    const {values, handleChange, handleSubmit} = useFormik({
        initialValues,
        enableReinitialize : true,
        validationSchema,
        onSubmit : (values) => {
            setMinPrice(values.minPrice)
            setMaxPrice(values.maxPrice)
            setSearchParams(searchParam)
        }
    })

    const setPrice = () => {
        if(minPrice) {
        searchParam.set('minPrice', minPrice)
        } else {
        searchParam.delete('minPrice')
        }
        if(maxPrice) {
        searchParam.set('maxPrice', maxPrice)
        } else {
        searchParam.delete('maxPrice')
        }
        setSearchParams(searchParam)
    }

    const getCategories = async() => {
        await axios.get('http://localhost:3001/category')
        .then(res => setCategories(res.data.categories))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getCategories()
        setPrice()
    }, [minPrice, maxPrice])

  return (
    <Box sx={{
        gridColumn : "span 2",
        backgroundColor : palette.background.alt,
        boxShadow : `1px 1px 6px 1px rgba(0, 0, 0, .1)`,
        height : "100%"
    }}>
        <Typography variant="h3" p="1rem" sx={{backgroundColor : palette.background.default , color:palette.neutral.dark}}>
            Categories
        </Typography>
        <MenuList>
        {categories &&
        (
            categories.map(cat => {
            return <ListItem
                 key={cat._id}
                 onClick={() => {
                    searchParam.set('category' , cat.name)
                    setSearchParams(searchParam)
                }}
                 sx={{
                    cursor : "pointer",
                    color : palette.neutral.main,
                    fontSize : '1rem',
                    p : ".5rem 1rem"
                 }}
                >
                {cat.name}
                </ListItem>
            })
        )
        }

        </MenuList>
        <Typography variant="h3" p="1rem" sx={{backgroundColor : palette.background.default , color:palette.neutral.dark}}>
            Price
        </Typography>
        <Box mt="1rem" p="0 1rem">
            <form onSubmit={handleSubmit}>
            <TextField size="small"
                       name="minPrice"
                       placeholder="min" 
                       type="number" 
                       value={values.minPrice} 
                       onChange={handleChange} 
                       sx={{width : "7rem", mr: ".5rem"}}
                       />
            <TextField size="small" 
                       name="maxPrice"
                       placeholder="max" 
                       type="number" 
                       value={values.maxPrice} 
                       onChange={handleChange} 
                       sx={{width : "7rem", mr: ".5rem"}}
                       />
                       <IconButton type="submit">
                        <Search />
                       </IconButton>
            </form>
        </Box>
        <MenuList>
        <ListItem onClick={() => {setMaxPrice(100);setMinPrice(null)}}
                  sx={{
                     cursor : "pointer",
                     color : palette.neutral.main,
                     fontSize : '1rem',
                     p : ".5rem 1rem"
                  }}>

                    less than 100$
        </ListItem>
        <ListItem onClick={() => {setMinPrice(100); setMaxPrice(500)}}
                  sx={{
                     cursor : "pointer",
                     color : palette.neutral.main,
                     fontSize : '1rem',
                     p : ".5rem 1rem"
                  }}>

                    100$ - 500$
        </ListItem>
        <ListItem onClick={() => {setMinPrice(500); setMaxPrice(1000)}}
                  sx={{
                     cursor : "pointer",
                     color : palette.neutral.main,
                     fontSize : '1rem',
                     p : ".5rem 1rem"
                  }}>

                    500$ - 1000$
        </ListItem>
        <ListItem onClick={() => {setMinPrice(1000); setMaxPrice(2000)}}
                  sx={{
                     cursor : "pointer",
                     color : palette.neutral.main,
                     fontSize : '1rem',
                     p : ".5rem 1rem"
                  }}>
                    1000$ - 2000$
        </ListItem>
        <ListItem onClick={() => {setMinPrice(2000); setMaxPrice(null)}}
                  sx={{
                     cursor : "pointer",
                     color : palette.neutral.main,
                     fontSize : '1rem',
                     p : ".5rem 1rem"
                  }}>
                    more than $2000
        </ListItem>
        </MenuList>
    </Box>
  )
}

export default Sidebar