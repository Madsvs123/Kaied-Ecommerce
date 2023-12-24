import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import {Box, Link, List, Toolbar, ListItem, ListItemText, ListItemIcon, ListItemButton} from '@mui/material'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import { Home,  
         Person, 
         Menu,
         AdminPanelSettings,
         Settings, Dashboard, 
         Inventory, 
         Group, 
         ChevronLeft, 
         ChevronRight,
         Category, 
         Logout} 
         from '@mui/icons-material';

import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  backgroundColor : theme.palette.neutral.dark,
  color : theme.palette.neutral.light,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user)

  const MainLinks = [{
    label : "Dashboard",
    navigate : "/admin",
    icon : <Dashboard sx={{fontSize:'1.2rem', mr:"1rem", color: theme.palette.primary.light}} />
},
{
    label : "Products",
    navigate : "/admin/product",
    icon : <Inventory sx={{fontSize:'1.2rem', mr:"1rem", color: theme.palette.primary.light}} />
},
{
  label : "Categories",
  navigate : "/admin/category",
  icon : <Category sx={{fontSize:'1.2rem', mr:"1rem", color: theme.palette.primary.light}} />
},
{
    label : "Customers",
    navigate : "/admin/customer",
    icon : <Group sx={{fontSize:'1.2rem', mr:"1rem", color: theme.palette.primary.light}} />
},
{
    label : "Setting",
    navigate : "/admin/setting",
    icon : <Settings sx={{fontSize:'1.2rem', mr:"1rem", color: theme.palette.primary.light}} />
},
{
    label : "Home",
    navigate : "/",
    icon : <Home sx={{fontSize:'1.2rem', mr:"1rem", color: theme.palette.primary.light}} />
},
{
    label : "Logout",
    navigate : "",
    icon : <Logout sx={{fontSize:'1.2rem', mr:"1rem", color: theme.palette.primary.light}} />
}
]

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Box display="flex" alignItems="center" justifyContent="center">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 3,
              ...(open && { display: 'none' }),
            }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h4" display="flex" alignItems="center" noWrap component="div">
          <Person sx={{fontSize : "1.5rem", mr: ".5rem"}} />
            {user.username}
          </Typography>
          </Box>
          <Box>
            <Link href="/" underline='none' fontSize="large">Home</Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} PaperProps={{sx : {backgroundColor : theme.palette.neutral.dark,color : theme.palette.neutral.light}}}>
        <DrawerHeader>
        <Box display="flex" alignItems="center" justifyContent="center" ml="1rem">
          <AdminPanelSettings sx={{fontSize : "1.7rem", mr: ".5rem"}} />
            <Typography sx={{fontSize : "1.5rem"}}>
            Admin
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {MainLinks.map((link, index) => (
            <ListItem key={link.label} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
              onClick={() => navigate(link.navigate)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {link.icon}
                </ListItemIcon>
                <ListItemText primary={link.label} disableTypography	 sx={{ opacity: open ? 1 : 0, fontSize :"1rem" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

        <DrawerHeader />
        <Outlet />

         </Box>
         
    </Box>
  );
}