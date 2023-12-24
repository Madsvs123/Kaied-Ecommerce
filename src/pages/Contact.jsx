import { Box, Button, TextField, Typography, useMediaQuery, MenuList, ListItem, Link, Alert } from "@mui/material"
import {Home , Phone, Email} from "@mui/icons-material"
import Navbar from "../layouts/navbar/Navbar"
import Footer from "./Footer"
import { useTheme } from "@emotion/react"
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from "axios"

const validationSchema = yup.object().shape({
  email : yup.string().email('please type a valid email').required('required email'),
  message : yup.string().max(600, 'very long message').required('contact message required')
})

const initialValues = {
  email : "",
  message : ""
}

const Contact = () => {
  const {values, errors, touched, handleSubmit, handleChange, resetForm} = useFormik({
    initialValues,
    validationSchema,
    onSubmit : async(values) => {

      const contactData = JSON.stringify(values)

      console.log(contactData)

      // await axios.post("http://localhost:3001/contact", contactData, {
      //   headers : {"Content-Type" : "application/json"}
      // }).then(res => console.log(res)).catch(err => console.log(err))

    }
  })
  
  

    const {palette} = useTheme()
    const isNonMobileScreen = useMediaQuery("(min-width : 850px)")

  return (
    <Box>
        <Navbar />
        <div className="container">
            <Box sx={{
                      borderRadius : "1rem", 
                      p: "1rem",
                      m:"2rem 0",
                      display : "grid",
                      gridTemplateColumns : isNonMobileScreen ? "1fr 2px 1fr" : "100%",
                      gap : "2rem"
                    }}
              >

            <Box color={palette.neutral.dark}>

                <MenuList>
                <ListItem>
                <Home />
                <Typography ml="1rem">
                Egypt - Ghrabia - Tanta - Nawag - HosnyBasha street <br />
                postal code : (31732)
                </Typography>
                </ListItem>
                <ListItem>
                    <Phone />
                <Typography ml="1rem">201552924972</Typography>
                </ListItem>
                <ListItem>
                <Email />
                <Typography ml="1rem">ahmedamin12323@gmail.com</Typography>
                </ListItem>
                </MenuList>

            </Box>

            <div style={{
                height : "80%",
                width : "1px",
                margin : "auto 0",
                backgroundColor : palette.primary.light
            }}>

            </div>

            <Box>
              <Typography variant="h6" color={palette.primary.main}>
              We always strive to satisfy the customer ..
              </Typography>
              <Typography variant="h4" fontWeight={500} m=".7rem 0" color={palette.neutral.dark}>
                Contact Us
              </Typography>
              <form onSubmit={handleSubmit}>
              <TextField size="small"
                         placeholder="Email Here"
                          fullWidth
                          margin="dense"
                          type="email"
                          name = "email"
                          value={values.email}
                          onChange={handleChange}
                          error = {Boolean(errors.email)}
                          helperText = {errors.email}
                />

              <TextField size="small"
                         placeholder="Message Here" 
                         rows={10} 
                         multiline={true} 
                         fullWidth
                         margin="dense"
                         name = "message"
                         value={values.message}
                         onChange={handleChange}
                         error = {Boolean(errors.message)}
                         helperText = {errors.message}

                         />
              <Button 
                   type="submit"
                   variant="contained" 
                   fullWidth
                   sx = {{mt : ".5rem", color : palette.neutral.light}}
                   >
                    Contact Us
              </Button>

              </form>
            </Box>
            </Box>
        </div>
        <Footer />
    </Box>
  )
}

export default Contact