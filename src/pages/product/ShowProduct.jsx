import { useTheme } from "@emotion/react"
import { Typography, Box, Button, useMediaQuery, IconButton , Divider } from "@mui/material"
import Navbar from "../../layouts/navbar/Navbar"
import ProductRate from "../../components/ProductRate"
import axios from 'axios'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useDispatch } from "react-redux"
import { updateCart } from "../../state/cart"
import {useParams} from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ShowProduct = () => {

  const [data, setData] = useState(null)
  const [count, setCount] = useState(0)
  const [ButtonState , setButtonState] = useState(false)
  const { palette } = useTheme()
  const isNonMobileScreen = useMediaQuery("(min-width : 850px)")
  const id = useParams().id
  const token = useSelector(state => state.auth.token)
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  

  const getData = async() => {
    await axios.get(`http://localhost:3001/product/${id}`).then(reponse => setData(reponse.data.product)).catch(err => console.log(err))
  }

  useEffect(() => {
    getData()
  }, [])

  const increaseCount = (max) => {
    if (count === max) return
    return setCount(count + 1)
  }

  const decreaseCount = () => {
    if (count === 0) return
    return setCount(count - 1)
  }

  const sendToCart = async(count) => {

    const cartItem = {
      user : user._id ,
      item : {product : data._id, quantity : count, subTotal :data.price * count}
    }

    const cartItemData = JSON.stringify(cartItem)
    if(count > 0) {

    await axios.post(`http://localhost:3001/cart/add`, cartItemData , 
    {headers : {
      'Authorization' : token,
      'Content-Type' : 'application/json'
  }}).then(response => {
    setButtonState(true)
    setCount(0)
        dispatch(updateCart({
      cart : response.data.cart
    }))

}).catch(error => {

    console.log(error)
    setButtonState(true)
    setCount(0)

  })
 }


  }

  return (
    <Box>
      <Navbar />
    {data && (
      <>
            <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
            <Box display="flex"
            justifyContent="center"
            flexDirection={isNonMobileScreen ? "row" : "column" }
            width={isNonMobileScreen ? "80%" : "95%"} 
            sx={{
              backgroundColor: palette.background.alt,
              boxShadow : `1px 1px 6px 1px rgba(0, 0, 0, .1)`,
              p : "2rem",
              mt : "2rem",
              borderRadius : "1rem"
            }}
            >
       <Box width={isNonMobileScreen ? "35%" : "100%"} height="100%" display="grid" gridTemplateColumns="repeat(4, (minmax(0, 1fr))">
      <img src={`http://localhost:3001/assets/${data.images[0].name}`} width="100%" alt="pic" />
      <img src={data.images[1] && `http://localhost:3001/assets/${data.images[1].name}`} width="25%" style={{display : data.images[1] ? "inline" : "none"}} alt="pic" />
      <img src={data.images[2] && `http://localhost:3001/assets/${data.images[2].name}`} width="25%" style={{display : data.images[2] ? "inline" : "none"}} alt="pic" />
      <img src={data.images[3] && `http://localhost:3001/assets/${data.images[3].name}`} width="25%" style={{display : data.images[3] ? "inline" : "none"}} alt="pic" />
      <img src={data.images[4] && `http://localhost:3001/assets/${data.images[4].name}`} width="25%" style={{display : data.images[4] ? "inline" : "none"}} alt="pic" />
      </Box>
      <Box display="flex" flexDirection="Column" width="100%" p="1rem 2rem">
      <Typography variant="h2" mb="1rem" color={palette.neutral.dark} fontWeight="500" sx={{m : "0"}}>
        {data.name}
      </Typography>
      <Divider sx={{m:"1rem 0"}} />
      <Typography variant="h3" m=".5rem 0" fontWeight="500" color={palette.primary.main}>
        {data.price}USD
      </Typography>
      <div style={{margin : "1rem 0"}}>
        <form style={{display : "flex", flexDirection : isNonMobileScreen ? "row" : "column", gap: "1rem"}}>
         <div>
          <IconButton disabled={ButtonState} variant="contained" onClick={() => decreaseCount()}>
            <RemoveIcon sx={{fontSize: '1.5rem'}} />
          </IconButton>
          <span style={{
            padding : ".5rem",
            background : palette.neutral.light,
            fontSize : "1rem",
            fontWeight : "700"

          }}>
          {count}
          </span>
          <IconButton disabled={ButtonState} variant="contained" onClick={() => increaseCount(data.numOnStock)}>
            <AddIcon sx={{fontSize: '1.5rem'}} />
          </IconButton>
         </div>
        <Button variant="contained" disabled={ButtonState} onClick={() => {user && sendToCart(count)}} sx={{
                    p : ".5rem 1rem",
                    color : palette.background.alt,
                    width : isNonMobileScreen ? "50%" : "80%",
                    fontWeight : '700',
                    "&:hover" : { backgroundColor : palette.primary.main },
                    }}>
          Add to Cart
        </Button>
        </form>
      </div>
        <ProductRate rate={data.rate} />
      <Typography variant="h5" color={palette.neutral.dark} m="1rem 0">
        {data.description}
      </Typography>
      </Box>
       </Box>

    </Box>
      
      </>
    )}

  </Box>
  ) 
}

export default ShowProduct