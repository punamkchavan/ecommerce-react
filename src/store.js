import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storageObject from "redux-persist/lib/storage";
import {
    productsReducer,
    productDetailsReducer,
    newProductReducer,
    productReducer,
    newReviewReducer,
    productReviewsReducer,
    reviewReducer
} from "./slices/productSlice.js";
import { cartReducer } from "./slices/cartSlice.js";
import {
    userReducer,
    profileReducer,
    forgotPasswordReducer,
    allUsersReducer,
    userDetailsReducer
} from "./slices/userSlice.js";

const storage = storageObject.default || storageObject;

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "cart"],
};

const rootReducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: (state = {}) => state,
    myOrders: (state = { orders: [] }) => state,
    orderDetails: (state = { order: {} }) => state,
    allOrders: (state = { orders: [] }) => state,
    order: productReducer,
    newReview: newReviewReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    newProduct: newProductReducer,
    product: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

const initialState = {
    user: {
        isAuthenticated,
        user: {},
        loading: false
    },
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    },
};

const store = configureStore({
    reducer: persistedReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

const persistor = persistStore(store);

export { store, persistor };
