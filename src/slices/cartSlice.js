import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const proxy = import.meta.env.VITE_PROXY || "";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
        error: null,
        loading: false,
    },
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
            );

            if (isItemExist) {
                state.cartItems = state.cartItems.map((i) =>
                    i.product === isItemExist.product ? item : i
                );
            } else {
                state.cartItems.push(item);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        cartAddFail: (state, action) => {
            state.error = action.payload;
        },
        removeItemsFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (i) => i.product !== action.payload
            );
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        saveShippingInfo: (state, action) => {
            state.shippingInfo = action.payload;
            localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem("cartItems");
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    addToCart,
    cartAddFail,
    removeItemsFromCart,
    saveShippingInfo,
    clearCart,
    clearErrors: clearCartErrors,
} = cartSlice.actions;

export const addItemsToCart = (id, quantity) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: token,
            },
        };
        const { data } = await axios.get(`${proxy}/api/v1/product/${id}`, config);
        dispatch(
            addToCart({
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
                stock: data.product.Stock,
                quantity,
            })
        );
    } catch (error) {
        dispatch(cartAddFail(error.response.data.message));
    }
};

export const cartReducer = cartSlice.reducer;
