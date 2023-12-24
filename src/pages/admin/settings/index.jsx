import React from 'react'
import {Box, Divider, List, ListItem, ListItemButton, Paper, useMediaQuery, ListItemIcon, ListItemText, Typography} from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom';
import {useTheme} from '@mui/material';
import { Settings } from '@mui/icons-material';

const AdminSetting = () => {
  const navigate = useNavigate()
  const {palette} = useTheme()
  const isNonMobileScreen = useMediaQuery("(min-width : 850px)")
  
  return (
    <Box display="flex" flexDirection={isNonMobileScreen ? "row" : "column"} gap="1rem">
      <Box component={Paper} width={isNonMobileScreen ? "20%" : "100%"} >
        <List >
          <ListItem>
            <div style={{display: "flex", alignItems: "center"}}>
            <Settings sx={{color : palette.neutral.main, mr: ".5rem", fontSize : "1.5rem"}} />
            <Typography variant='h4' sx={{color : palette.neutral.dark}}>
              Setting
            </Typography>
            </div>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/admin/setting/category")} sx={{p : ".7rem 1rem"}}>
            <Typography variant='h5' sx={{color : palette.neutral.dark}} >
            Category 
            </Typography> 
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/admin/setting/discount")} sx={{p : ".7rem 1rem"}}>
            <Typography variant='h5' sx={{color : palette.neutral.dark}} >
            Discount 
            </Typography> 
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Box component={Paper} width={isNonMobileScreen ? "80%" : "100%"} p="1rem">
        <Outlet />
      </Box>
    </Box>
  )
}

export default AdminSetting