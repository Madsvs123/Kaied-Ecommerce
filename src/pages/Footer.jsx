import { useTheme } from "@emotion/react"
import { Build, BuildCircle, Email, Home, LinkedIn, Phone } from "@mui/icons-material"
import { Box, MenuList, useMediaQuery, ListItem, Typography, Link, Button, IconButton } from "@mui/material"

const Footer = () => {
  const {palette} = useTheme()
  const isNonMobileScreen = useMediaQuery('(min-width: 850px)')

  return (
      <Box mt="2rem" sx={{
        backgroundColor: palette.neutral.dark,
        color : palette.neutral.light,
        padding : '1.5rem 0',
      }}>
        <div className="container">
          <Box display="grid" gap="1rem" gridTemplateColumns={isNonMobileScreen ? "repeat(3, 1fr)" : "100%"} mb="2rem">
            <Box>
            <Typography variant={isNonMobileScreen ? "h2" : "h3"}
                  fontWeight="700" 
                  sx={{cursor : "pointer"}}
                  mb=".7rem"
                  color={palette.primary.main}
        >
          Kaied Market
         </Typography>
         <Typography variant="h5"
         fontWeight="500">
          We always aim to satisfy the customer and provide products that is best .
         </Typography>
            </Box>
            <MenuList sx={{fontSize : ".8rem"}}>
            <ListItem><Link variant="h5" color={palette.neutral.light} underline="none" href="/">Home</Link></ListItem>
              <ListItem><Link variant="h5" color={palette.neutral.light} underline="none" href="/contact">Contact US</Link></ListItem>
              <ListItem><Link variant="h5" color={palette.neutral.light} underline="none" href="/about">Abous Us</Link></ListItem>
            </MenuList>
            <MenuList sx={{fontSize : ".8rem"}}>
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
              <Link ml="1rem" variant="h6" color={palette.neutral.light} underline="none" href="mailto:ahmedamin12323@gmail.com">ahmedamin12323@gmail.com</Link>
              </ListItem>
            <ListItem><Typography></Typography></ListItem>
            </MenuList>
          </Box>

          <div style={{
            width : "100%",
            height : "1px",
            backgroundColor : palette.neutral.main,
            margin : "2rem auto"
          }}
          ></div>

          <Box display="flex" justifyContent="space-around" flexDirection={isNonMobileScreen ? "row" : "column"} alignItems="center">
            <Typography variant="h5">
              @2023 All Right Reserve Terms of Use And Privacy Plicy
            </Typography>
            <Box mt={isNonMobileScreen ? "0" : "1rem"}>
              <IconButton>
                <LinkedIn sx={{fontSize : "1.5rem", color : palette.neutral.light}} />
              </IconButton>
              <IconButton>
                <LinkedIn sx={{fontSize : "1.5rem", color : palette.neutral.light}} />
              </IconButton>
              <IconButton>
                <LinkedIn sx={{fontSize : "1.5rem", color : palette.neutral.light}} />
              </IconButton>
              <IconButton>
                <LinkedIn sx={{fontSize : "1.5rem", color : palette.neutral.light}} />
              </IconButton>
            </Box>
          </Box>
        </div>
      </Box>

  )
}

export default Footer