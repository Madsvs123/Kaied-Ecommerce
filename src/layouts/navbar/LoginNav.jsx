import { Box, Button, Typography, useMediaQuery } from "@mui/material"
import FlexBetween from '../../components/FlexBetween';
import { useTheme } from "@emotion/react"
import { useNavigate } from 'react-router-dom'

const LoginNav = () => {

    const { palette } = useTheme()
    const navigate = useNavigate()

    const inNonMobileScreen = useMediaQuery("(min-width : 800px)");

  return (
    <Box p="1rem 2rem" sx={{backgroundColor : palette.background.alt}}>
    <div className="container">
    <FlexBetween>
    <Typography onClick={() => navigate('/')} variant={inNonMobileScreen ? "h2" : "h3"}
                  fontWeight="700" 
                  sx={{cursor : "pointer"}}
                  color={palette.primary.main}
        >
          Kied Market
         </Typography>
      <Button sx={{fontSize : "1rem" ,color : palette.neutral.dark}}>
        About Us
      </Button>
    </FlexBetween>
    </div>
    </Box>
  )
}

export default LoginNav