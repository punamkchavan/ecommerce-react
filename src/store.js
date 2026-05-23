import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storageObject from "redux-persist/lib/storage";

const storage = storageObject.default || storageObject;

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "cart"],
};

const rootReducer = combineReducers({
    products: (state = { products: [] }) => state,
    productDetails: (state = { product: {} }) => state,
    user: (state = { user: {}, loading: false, isAuthenticated: false }) => state,
    profile: (state = {}) => state,
    forgotPassword: (state = {}) => state,
    cart: (state = { cartItems: [], shippingInfo: {} }) => state,
    newOrder: (state = {}) => state,
    myOrders: (state = { orders: [] }) => state,
    orderDetails: (state = { order: {} }) => state,
    allOrders: (state = { orders: [] }) => state,
    order: (state = {}) => state,
    newReview: (state = {}) => state,
    productReviews: (state = { reviews: [] }) => state,
    review: (state = {}) => state,
    allUsers: (state = { users: [] }) => state,
    userDetails: (state = { user: {} }) => state,
    newProduct: (state = {}) => state,
    product: (state = {}) => state,
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
