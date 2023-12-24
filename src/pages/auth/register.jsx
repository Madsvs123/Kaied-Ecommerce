import { useFormik } from 'formik'
import * as yup from 'yup'
import { Box, TextField, Typograpgy, Button, useMediaQuery, useTheme, Alert, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import countryList from 'react-select-country-list'
import { useDispatch } from 'react-redux'
import { useMemo, useState } from 'react'
import axios from 'axios'

const validationSchema = yup.object().shape({
  username : yup.string().required("This Field Is Required"),
  email : yup.string().email().required("This Field Is Required"),
  password : yup.string().required("This Field Is Required"),
  confirmPassword : yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
  country : yup.string().required("This Field Is Required"),
  phoneNumber : yup.number("Type valid phone number").min(5, "Type valid phone number").required("This Field Is Required"),
  location : yup.string().required("This Field Is Required")
})

const initialValues = {
  username : "",
  email : "",
  password : "",
  confirmPassword : "",
  country : "",
  phoneNumber : "",
  location : "",
}

const Register = () => {

  const [country, setCountry] = useState("")
  const [submitMsg, setSubmitMsg] = useState(null)
  const countries = useMemo(() => countryList().getData(), [])
  const dispatch = useDispatch()

  const handleFormSubmit = async (values, onSubmitProps) => {
    
    const registerData = JSON.stringify(values)

    await axios.post("http://localhost:3001/auth/register", registerData, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {

      onSubmitProps.resetForm()
      setSubmitMsg(response.data.message)
      

    }).catch(err => {
      
      onSubmitProps.setErrors({submitError : err.response.data.error})

    })

  } 

  const {values, errors, touched, handleBlur,handleChange, handleSubmit} = useFormik({
    initialValues,
    validationSchema,
    onSubmit : handleFormSubmit

  })

  const { palette } = useTheme()

  return (
    <form onSubmit={handleSubmit}>
      {errors.submitError && <Alert sx={{mb : "1rem"}} severity='error'>{errors.submitError}</Alert>}
      {submitMsg && <Alert sx={{mb : "1rem"}} severity='success'>{submitMsg}</Alert>}
    <Box display="grid" gridTemplateColumns="repeat(4, minmax(0, 1fr))" gap="1.5rem">
    <TextField 
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        name="username"
        label="username"
        error={Boolean(errors.username) && touched.username}
        helperText={touched.username && errors.username}
        sx = {{
          gridColumn : "span  4"
        }}
      />
      <TextField 
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        name="email"
        label="email"
        error={Boolean(errors.email) && touched.email}
        helperText={touched.email && errors.email}
        sx = {{
          gridColumn : "span  4"
        }}
      />
      <TextField 
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        name="password"
        label="password"
        type='password'
        error={Boolean(errors.password) && touched.password}
        helperText={touched.password && errors.password}
        sx = {{
          gridColumn : "span  4"
        }}
      />
      <TextField 
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        name="confirmPassword"
        label="confirm password"
        type='password'
        error={Boolean(errors.confirmPassword) && touched.confirmPassword}
        helperText={touched.confirmPassword && errors.confirmPassword}
        sx = {{
          gridColumn : "span  4"
        }}
      />
      <FormControl sx={{gridColumn : "span 4"}}>
        <InputLabel id="countrylist">Country</InputLabel>
      <Select
        labelId='countrylist'
        value={values.country}
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.country) && touched.country}
        name="country"
        label="Country"
      >
        {countries.map(({value, label}) => {
          return (<MenuItem key={value} value={value}>{label}</MenuItem>)
        })}
      </Select>
      </FormControl>
      <TextField 
        value={values.phoneNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        name="phoneNumber"
        label="Phone Number"
        error={Boolean(errors.phoneNumber) && touched.phoneNumber}
        helperText={touched.phoneNumber && errors.phoneNumber}
        sx = {{
          gridColumn : "span  4"
        }}
      />
            <TextField 
        value={values.location}
        onChange={handleChange}
        onBlur={handleBlur}
        name="location"
        label="location"
        error={Boolean(errors.location) && touched.location}
        helperText={touched.location && errors.location}
        sx = {{
          gridColumn : "span  4"
        }}
      />
      <Box sx={{ gridColumn : "span 4"}}>
       <Button
         type="submit"
         fullWidth
         variant='caontained'
         sx={{
           backgroundColor: palette.primary.main,
           p : "1rem 0",
           color : "#EEE",
           "&:hover" : {
            backgroundColor: palette.primary.dark,
           }

          }}
       >
         Register
       </Button>
      </Box>
    </Box>
  </form>
  )
}

export default Register