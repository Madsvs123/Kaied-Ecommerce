import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems : [],
    total : 0
}

const cartSlice = createSlice({
    name : 'cart',
    initialState: initialState,
    reducers : {
        updateCart : (state, action) => {
            state.cartItems = action.payload.cart.items
            state.total = action.payload.cart.total

        }
    }
})


export const { updateCart } = cartSlice.actions
export default cartSlice.reducer