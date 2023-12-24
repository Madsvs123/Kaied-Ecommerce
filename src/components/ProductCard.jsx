import { useTheme } from "@emotion/react"
import { FavoriteOutlined } from "@mui/icons-material"
import { Box, IconButton, Paper, Typography, useMediaQuery } from "@mui/material"
import ProductRate from "./ProductRate"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"


const ProductCard = ({id ,name, img, price, rate, discount}) => {

    const navigate = useNavigate()
    const { palette } = useTheme()
    

    const isTabletScreen = useMediaQuery('(max-width: 1024px)')
    const isMobileScreen = useMediaQuery('(max-width: 750px)')

    const PageGridColumn = () => {
       
        if (isTabletScreen || isMobileScreen) {

        return 'span 4'
        }
        return 'span 3'
      }

      useEffect(() => {
        if(discount) {
        }
      }, [discount])
    

  return (
    <Box onClick={() => {navigate(`/product/${id}`)}} className="productCard" sx={{
        borderRadius : "5px",
        backgroundColor : palette.background.alt,
        position : "relative",
        gridColumn : PageGridColumn(),
    }}>
        <div className="discount" style={{backgroundColor : palette.secondry.dark}}>
            <Typography textAlign="center" sx={{color : palette.neutral.light}}>
                25% Discount
            </Typography>
        </div>
        <IconButton sx={{
            position : "absolute",
            top: "0", left: "0",
            zIndex: "10",
            borderRadius : "10px",
            backgroundColor : palette.background.alt,
        }}>
        <FavoriteOutlined sx={{
            fontSize : "1.5rem",
            color : palette.primary.main
            }} />
        </IconButton>
        <div style={{textAlign : "center"}}>
        <img src={`http://localhost:3001/assets/${img}`} alt="pic"
             width="100%"
             style={{padding : ".5rem"}}
             />
        </div>
        <Box p=".5rem" sx={{
            position : "absolute",
            bottom : "0",
            left : "0",
            width : "100%",
            backgroundColor : palette.background.alt
        }}>
            <Typography variant="h3" mb=".5rem" sx={{
                color : palette.neutral.dark,
            }}>
                {name}
            </Typography>
            <Typography variant="h4" sx={{
                color : palette.primary.main,
                fontWeight : "700"
            }}>
                {price}USD
            </Typography>
        </Box>
        <ProductRate rate={rate} style={{position: "absolute",
                                      bottom:"1rem",
                                      right:"1rem"}} 
        />
    </Box>
  )
}

export default ProductCard