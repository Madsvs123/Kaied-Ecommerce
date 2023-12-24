import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import Auth from './pages/auth'
import themeData from './theme'
import HomePage from './pages/home'
import AdminPage from './pages/admin'
import Dashboard from './pages/admin/Dashboard'

import Categories from './pages/admin/Categories'
import AddCategory from './pages/category/AddCategory'
import AddSubCategory from './pages/category/AddSubCategory'

import NonAdmin from './pages/admin/NonAdmin'

import AdminSetting from './pages/admin/settings'
import General from './pages/admin/settings/General'
import Discount from './pages/admin/settings/Discount'

import Products from './pages/admin/Products'
import AddProduct from './pages/product/AddProduct'
import EditProduct from './pages/product/EditProduct'
import ShowProduct from './pages/product/ShowProduct'

import CartPage from './pages/cart'
import Contact from './pages/Contact'
import About from './pages/About'
import NotFound from './pages/NotFound'
import axios from 'axios'
import { updateCart } from './state/cart'
import { useEffect } from 'react'

function App() {

  const mode = useSelector((state) => state.auth.mode)
  const theme = createTheme(themeData(mode))
  const user = useSelector((state) => state.auth.user)
  const token = useSelector((state) => state.auth.token)
  const dispatch = useDispatch()

  const getCart = async () => {
      await axios.get(`http://localhost:3001/cart/${user._id}`, {
        headers : {
          'Authorization' : token,
          "Content-Type" : "application/json"
        }
      }).then(res => {
          dispatch(updateCart({
              cart : res.data.cart
          }))
      })
  }

  useEffect(() => {
    if(user) {
      getCart()
    }
  }, [user])

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Routes>
              <Route index element={ <HomePage /> } />
              <Route path="/cart" element={ <CartPage /> } />
              <Route path='/login' element={<Auth />} />
              <Route path="admin" element={ (user && user.isAdmin) ? <AdminPage /> : <NonAdmin /> }>
              <Route index element={ <Dashboard /> } />
               <Route path="product" element={ <Products /> } />
               <Route path="product/add" element={ <AddProduct /> } />
               <Route path="product/edit/:id" element={ <EditProduct /> } />
               <Route path="category" element={ <Categories /> } />
               <Route path="category/add" element={ <AddCategory /> } />
               <Route path="category/:id/add" element={ <AddSubCategory /> } />
               <Route path="setting" element={ <AdminSetting /> }>
                <Route index element={<General />} />
                <Route path='discount' element={<Discount />} />
               </Route>
                </Route>
                <Route path="product/:id" element={ <ShowProduct /> } />
                <Route path="*" element={ <NotFound /> } />
                <Route path="/contact" element={ <Contact /> } />
                <Route path="/about" element={<About /> } />

          </Routes>
        </CssBaseline>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
