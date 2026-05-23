import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        shippingInfo: {},
    },
    reducers: {}
});

export const addItemsToCart = (id, quantity) => (dispatch) => {
    dispatch({ type: "cart/addPlaceholder" });
};

export const cartReducer = cartSlice.reducer;
