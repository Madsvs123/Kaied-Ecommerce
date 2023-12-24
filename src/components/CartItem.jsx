import { useDispatch, useSelector } from "react-redux"
import { Box, Button, Typography, useMediaQuery, Link } from '@mui/material'
import { useTheme } from "@emotion/react"
import { Delete } from "@mui/icons-material"
import { useEffect, useState } from "react"
import axios from 'axios'
import { updateCart } from "../state/cart"

const CartItem = (props) => {

  const { palette } = useTheme()
  const inNonMobileScreen = useMediaQuery("(min-width: 850px)")
  const user = useSelector(state => state.auth.user)
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)

  const getItem = async() => {
    await axios.get(`http://localhost:3001/product/${props.id}`).then(res => setProduct(res.data.product)).catch(err => console.log(err))
  }

  const deleteItem = async() => {
    await axios.delete(`http://localhost:3001/cart/${user._id}/${props.id}`, {
      headers : {"Authorization" : token}
    }).then(res => {
      dispatch(updateCart({
        cart : res.data.cart
    }))
    })
    .catch(err => console.log(err))

  }

  useEffect(() => {
    getItem()
  }, [])

  return (
    <Box sx={{display:"flex",
              flexDirection : inNonMobileScreen ? "row" : "column",
              gap:"1rem",
              backgroundColor : palette.background.alt, 
              p : "1rem", 
              borderRadius : "1rem",
              overflow : "hidden",
              boxShadow : "1px 1px 6px 1px rgba(0, 0, 0, .1)"
              }} 
              >
      <div style={{width: inNonMobileScreen ? "15%" : "100%", backgroundColor: "#FFF"}}>
        <img src={product && `http://localhost:3001/assets/${product.images[0].name}`} width="100%" alt="cartItem image" />
      </div>

      <div style={{display: "grid", 
                   gridTemplateColumns: inNonMobileScreen ? "repeat(3, minmax(0, 1fr))" : "100%",
                   flexDirection:  inNonMobileScreen ? "row" : "column",
                   rowGap : "1rem",
                   width: inNonMobileScreen ? "85%" : "100%",
                   }}>
        {product && (
        <div>
        <Link href={`/product/${props.id}`} variant="h4" underline="none" sx={{color : palette.primary.dark, cursor:"pointer"}}>
          {product.name}
        </Link>
        <Typography variant="h5" sx={{color : palette.neutral.main, m : ".5rem 0"}}>
        {product.category}
        </Typography>
        <Typography variant="h4" sx={{color : palette.primary.dark}}>
        {product.price} USD
        </Typography>
        </div>
        )}
        <div>
        <Typography variant="h5" sx={{color : palette.neutral.main, mb: ".5rem"}}>
            quantity
          </Typography>
          <Typography variant="h4" sx={{color : palette.primary.dark}}>
            {props.quantity}
          </Typography>
        </div>
        <div>
          <Typography variant="h4" sx={{color : palette.neutral.main, mb: ".5rem"}}>
            total
          </Typography>
          <Typography variant="h4" sx={{color : palette.primary.dark}}>
          {props.total + ' USD'}
          </Typography>
        </div>
        <div>
        </div>
      </div>
      <Button color="error" onClick={() => deleteItem()}>
            <Delete fontSize="large" />
      </Button>
    </Box>
  )
}

export default CartItem