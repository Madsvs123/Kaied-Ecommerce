import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mode : "light",
    authPageType : "login", 
    user : null,
    token : null,
}

const authSlice = createSlice({
    name : "auth",
    initialState,

    reducers : {
        setMode : (state) => {
            state.mode = state.mode === "light" ? "dark" : "light"
        },
        setAuthPageType : (state) => {
            state.authPageType = state.authPageType === "login" ? "register" : "login"
        }
        ,setLogIn : (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setLogOut : (state) => {
            state.user = null
            state.token = null
        }

    }
})

export const { setMode, setAuthPageType ,setLogIn, setLogOut } = authSlice.actions
export default authSlice.reducer
