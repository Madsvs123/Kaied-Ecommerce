import FlexBetween from '../../components/FlexBetween';
import { Box, Typography, useTheme, IconButton, InputBase, useMediaQuery, Button } from '@mui/material';
import { Search } from "@mui/icons-material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import { useSelector } from 'react-redux';
import NavLink from './NavLink';
import UserMenu from './UserMenu';
import MobileMenu from './MobileMenu';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const user = useSelector(state => state.auth.user)
  const cart = useSelector(state => state.cart.cartItems)
  const navigate = useNavigate()

    const { palette } = useTheme()
    const isNonMobileScreen = useMediaQuery("(min-width : 800px)")
    const [mobileMenuOpen , setMobileMenuOpen] = useState(false)

  return (
    <Box p="1rem 0" sx={{backgroundColor : palette.background.alt}}>
      <div className="container">
      <FlexBetween>
           <Typography onClick={() => navigate('/')} variant={isNonMobileScreen ? "h2" : "h3"}
                  fontWeight="700" 
                  sx={{cursor : "pointer"}}
                  color={palette.primary.main}
        >
          Kaied Market
         </Typography>
         {user ? (
          <>
         {isNonMobileScreen ? (
          <>
         <FlexBetween backgroundColor={palette.neutral.light} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
          <InputBase placeholder="Search..." />
          <IconButton>
          <Search />
          </IconButton>
          </FlexBetween>
          <Box display="flex">
            <NavLink onClick={() => navigate('/cart')} sx={{
                  color: palette.neutral.dark,
                  borderRight : `1px solid ${palette.neutral.medium}`,
                  position : 'relative'
            }}>
            <ShoppingCartIcon sx={{fontSize: "1.5rem" , m:"0 .5rem"}} />
            <span style={{fontSize : "1rem"}}>Cart</span>

              {cart && (
            <span style={{
              position : "absolute",
              top : "-3px",
              left : "39%",
              padding : "1px 2px",
              borderRadius : "10px",
              fontSize : ".8rem",
              backgroundColor : palette.primary.main,
              color : palette.neutral.dark
            }}>
              {cart.length}
            </span>
              )}

            </NavLink>
            <NavLink
            sx={{
              color: palette.neutral.dark,
              borderRight : `1px solid ${palette.neutral.medium}`
        }}
            >
            <FavoriteIcon sx={{fontSize: "1.5rem" , m:"0 .5rem"}} />
            <span style={{fontSize : "1rem"}}>Favoutite</span>
            </NavLink>
            <UserMenu />
          </Box>
          </>
          ) : (
            <>
            <Button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <MenuIcon sx={{color: mobileMenuOpen ? palette.primary.main : palette.neutral.main,fontSize : "2rem"}} />
            </ Button>
            {mobileMenuOpen && (<MobileMenu />)}

            </>
          )}
          </>) : (
            <NavLink
            sx={{
              color: palette.neutral.dark,
              "&:hover" : {color: palette.primary.main}
                }}
            onClick={() => navigate('/login')}
            >
            <span style={{fontSize : "1.2rem"}}>Log In</span>
            <LoginIcon sx={{fontSize: "1.5rem" , m:"0 .1rem"}} />
            </NavLink>

          )}
      </FlexBetween>
      </div>
    </Box>
  )
}

export default Navbar