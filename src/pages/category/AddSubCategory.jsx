import {useParams} from 'react-router-dom'
import axios from 'axios'
import {TextField, Button, Box, Typography, useMediaQuery, Paper} from "@mui/material"
import { useState, useEffect } from 'react'
import { useTheme } from '@emotion/react'
import { useFormik } from "formik"
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  name : yup.string().max(30).required('category name required'),
  description : yup.string().max(200, "too long")
})

const initialValues = {
  name : "",
  description : ""
}

const AddSubCategory = () => {
  const params = useParams()
  const id = params.id
  const [category, setCategory] = useState(null)
  const {palette} = useTheme()
  const isNonMobileScreen = useMediaQuery("(min-width: 850px)")


  const {values, errors, touched, handleChange, handleSubmit} = useFormik({
    initialValues,
    validationSchema,
    onSubmit : async (values) => {

      const data = {
        name : values.name,
        description : values.description,
        category : category._id
      }

      const reqData = JSON.stringify(data)
      
      await axios.post(`http://localhost:3001/subcategory/add`, reqData, {
        headers : {'Content-Type': 'application/json'}
      }).then(res => console.log(res)).catch(err => console.log(err))

    }
  })

  const getCategory = async() => {
    await axios.get(`http://localhost:3001/category/${id}`).then(res => setCategory(res.data.category)).catch(err => console.log(err))
  }

  useEffect(() => {
    getCategory()
  }, [])

  return (
    <Box component={Paper} p="1rem" width= {isNonMobileScreen ? "50%" : "100%"}>
      <Box mb="1rem">
        <Typography variant="h2" fontWeight={500} sx={{color : palette.neutral.dark}}>
          Add Sub Category
        </Typography>
      </Box>
      <Typography mb="1rem" color={palette.neutral.main}>
         Add SubCategory to {category && (
          <span style={{color : palette.primary.main, fontWeight : "500", fontSize : "1rem"}}>
            {category.name}
          </span>
         )}
      </Typography>
      <form onSubmit={handleSubmit}>
          <TextField 
            name="name"
            label="name"
            value={values.name}
            onChange={handleChange} 
            fullWidth
            sx={{mb : "1rem"}}
            error={Boolean(errors.name) && touched.name}
            helperText={touched.name && errors.name}
            />
            <TextField 
            name="description"
            label="Description"
            value={values.description}
            fullWidth
            onChange={handleChange} 
            sx={{mb : "1rem"}}
            multiline={true}
            rows={6}
            error={Boolean(errors.description) && touched.description}
            helperText={touched.description && errors.description}
            />
            <Button variant="contained" fullWidth type="submit" size="large">
              Add
            </Button>
        </form>
    </Box>
  )
}

export default AddSubCategory