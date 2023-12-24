import { useFormik } from 'formik'
import { TextField, 
         Box,  
         Button, 
         Alert, 
         useMediaQuery, 
         Select, 
         MenuItem, 
         FormControl, 
         InputLabel, 
         Paper,
         Typography
        } from '@mui/material'
import Dropzone from 'react-dropzone'
import axios from 'axios'


import * as yup from 'yup'
import { useTheme } from '@emotion/react'
import { useEffect, useState } from 'react'


const validationSchema = yup.object().shape({
    name : yup.string().min(3).max(25, "very long name").required("Product name is required"),
    category : yup.string().required("Caregory is required"),
    subCategory : yup.string().required("SubCaregory is required"),
    price : yup.number().required("Price is required"),
    desc : yup.string().max(600, "very long description").required("description is required"),
    numOnStock : yup.number().required("Product Number on Stock is required"),
    productImages : yup.array().required("Unless 1 images is required"),
})

const initialValues = {
    name : "",
    category : "",
    subCategory : "",
    price : "",
    desc : "",
    numOnStock : "",
    productImages : null
}

// const ErrorAlert = ({errorMsg}) => {
//     return (
//         <div style={{
//             padding : "1rem",
//             backgroundColor : "#fcd9d6",
//             color : "#611a15",
//             fontSize : "1rem",
//             fontWeight : "500",
//             margin : "1rem 0",
//             borderRadius : "1rem"
//         }}>
//             Some Field Are Invalid
//         </div>
//     )
// }

const AddProduct = () => {

    const { palette } = useTheme()
    const [submitMsg, setsubmitMsg] = useState(null)
    const [categoryOptions, setCategoryOptions] = useState(null)
    const [subCategoryOptions, setSubCategoryOptions] = useState(null)
    const isNonMobielScreen = useMediaQuery('(min-width: 900px)')

    const { values , errors, handleSubmit, handleChange, resetForm, setFieldValue } = useFormik({
        initialValues : initialValues,
        validationSchema : validationSchema,
        onSubmit : async (values, onSubmitProps) => {

          const formData = new FormData()
          for (let value in values) {
            formData.append(value, values[value])
          }

          for (let i = 0; i < values.productImages.length; i++) {
            formData.append('images', values.productImages[i])
          }

          await axios.post("http://localhost:3001/product/add", formData, { 
            headers: { "Content-Type": "multipart/form-data" } })
            .then((reponse) => {

              if (reponse.status === 200) {
                onSubmitProps.resetForm()
                setsubmitMsg("Product Added successfully")
              }
            })
            .catch((error) => console.log(error)) }
          })

          const getCategories = async() => {
            await axios.get('http://localhost:3001/category').then(res => setCategoryOptions(res.data.categories))
          }

          const getSubCategories = async(id) => {
            await axios.get(`http://localhost:3001/category/${id}`).then(res => setSubCategoryOptions(res.data.subCategories))
          }

          useEffect(() => {
            getCategories()
          }, [])

          console.log(subCategoryOptions)

  return (
          <Box component={Paper} p="1rem">
             <Box mb="1rem">
             <Typography variant="h2" fontWeight={500} sx={{color : palette.neutral.dark}}>
              Add Product
              </Typography>
            </Box>
            {submitMsg && (<Alert error='successful' sx={{mb : ".5rem"}}>{submitMsg}</Alert>)}
            <form onSubmit={handleSubmit}>
                <div style={{
                display : "grid",
                gridTemplateColumns : isNonMobielScreen ? "repeat(2, minmax(0, 1fr))" : "100%",
                gap : "1rem",
                marginBottom : "1rem"
                    }}>                        
                   <Box display="flex" flexDirection="column" rowGap="1rem">
                   <TextField label="Product Name" 
                            name="name" 
                            value={values.name}
                            onChange={handleChange}
                            sx={{gridColumn : "1", gridRow : "1"}} 
                            error={Boolean(errors.name)}
                            fullWidth
                    />
                    <FormControl variant='outlined' fullWidth error={Boolean(errors.category)}>
                      <InputLabel id="category">Category</InputLabel>
                      <Select
                         labelId='category'
                         name="category"
                         label="Category"
                         value={values.category}
                         onChange={handleChange}
                      >
                        {categoryOptions && (
                          categoryOptions.map(category => {
                            return <MenuItem key={category._id} value={category._id} onClick={() => getSubCategories(category._id)}>{category.name}</MenuItem>
                          })
                        )}
                      </Select>
                    </FormControl>
                    <FormControl variant='outlined' fullWidth error={Boolean(errors.subCategory)}>
                      <InputLabel id="subCategory">Sub Category</InputLabel>
                      <Select
                         labelId='subCategory'
                         name="subCategory"
                         label="Sub Category"
                         value={values.subCategory}
                         onChange={handleChange}
                      >
                        {subCategoryOptions ? (
                          subCategoryOptions.map(subCategory => {
                            return <MenuItem key={subCategory._id} value={subCategory._id}>{subCategory.name}</MenuItem>
                          })
                        ) : (
                          <p style={{padding : "0 1rem"}}>Choose a Category First</p>
                        )}
                      </Select>
                    </FormControl>
                    <TextField label="Price" 
                            type="number"
                            name="price" 
                            value={values.price}
                            onChange={handleChange}
                            error={Boolean(errors.price)} 
                            fullWidth
                    />
                    <TextField label="Number On Stock" 
                            name="numOnStock" 
                            value={values.numOnStock}
                            onChange={handleChange}
                            error={Boolean(errors.numOnStock)}
                            fullWidth
                    />
                    <TextField label="Description" 
                            name="desc" 
                            value={values.desc}
                            onChange={handleChange}
                            rows="10"
                            error={Boolean(errors.desc)}
                            multiline={true}
                            fullWidth
                    />
                   </Box>
                    <Box display="flex" flexDirection="column" rowGap="1rem">
                    <Box>
                      <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={true}
                        onDrop={(acceptedFiles) =>
                          setFieldValue("productImages", acceptedFiles)
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <Box
                            {...getRootProps()}
                            border={`2px solid ${palette.primary.main}`}
                            p="0 1rem"
                            borderRadius="1rem"
                            sx={{ "&:hover": { cursor: "pointer" } }}
                          >
                            <input {...getInputProps()} />
                              <p>Add Images Here</p>
                          </Box>
                        )}
                      </Dropzone>
                    </Box>
                    <div style={{
                        padding : ".5rem 1rem",
                        borderRadius : "1rem",
                        border : `1px solid ${palette.neutral.dark}`,
                        backgroundColor : palette.background.alt
                    }}>
                     {values.productImages ? (
                        <div> 
                            {values.productImages.map((img, key) => {
                                return (
                                    <div key={key} style={{
                                        backgroundColor : palette.primary.light,
                                        color : palette.neutral.dark,
                                        padding : "1rem",
                                        margin : "1rem 0",
                                        borderRadius : "1rem"
                                    }}>
                                        {img.name}
                                    </div>
                                )
                            })}
                        </div>
                     ) : (
                        <p> No Images Added </p>
                     ) }
                    </div>
                    </Box>
                </div>
                <Button variant="contained" 
                       color='info' 
                       size="large" 
                       fullWidth 
                       type='submit' >
                    Add
                </Button>
            </form>    
          </Box>
  )
}

export default AddProduct