import { useFormik } from 'formik'
import * as yup from 'yup'
import { Box, TextField, Typograpgy, Button, useMediaQuery, useTheme, Alert } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setLogIn, setMode } from '../../state/auth'
import axios from 'axios'

const validationSchema = yup.object().shape({
  email : yup.string().email().required(),
  password : yup.string().required()
})

const initialValues = {
  email : "",
  password : "",
}


const Login = () => {

  const theme = useTheme()
  const dispatch = useDispatch()

  const handleFormSubmit = async(values, onSubmitProps) => {
    const loginData = JSON.stringify(values)
    await axios.post('http://localhost:3001/auth/login', loginData, {
      headers : {"Content-Type" : "application/json"}
    }).then((reponse) => {
      const user = reponse.data.user
      const token = reponse.data.token
      dispatch(setLogIn({
        user : user,
        token : token
      }))

      console.log(reponse)
  
    }).catch((err) => {

      console.log(err)
      onSubmitProps.setErrors({submitError : err.response.data.error})
    })
  
  }

  const {values, errors, handleChange, handleSubmit} = useFormik({
    initialValues,
    validationSchema,
    onSubmit : handleFormSubmit
  })

  return (
    <form onSubmit={handleSubmit}>
      <Box display="grid" gridTemplateColumns="repeat(2, minmax(0, 1fr))" gap="1.5rem">
        {errors.submitError && (<Alert sx={{mb : "1rem", gridColumn: "span 2"}} severity='error'>{errors.submitError}</Alert>)}
        <TextField 
          value={values.email}
          onChange={handleChange}
          name="email"
          label="email"
          sx = {{
            gridColumn : "span  2"
          }}
        />
        <TextField 
          value={values.password}
          onChange={handleChange}
          type="password"
          name="password"
          label="password"
          sx = {{
            gridColumn : "span  2"
          }}
        />
        <Box sx={{ gridColumn : "span 2"}}>
         <Button
           fullWidth
           type="submit"
           variant='caontained'
           sx={{
             backgroundColor: theme.palette.primary.main,
             p : "1rem 0",
             color : "#EEE",
             "&:hover" : {
              backgroundColor: theme.palette.primary.dark,
             }

            }}
         >
           Login
         </Button>
        </Box>
      </Box>
    </form>
  )
}

export default Login