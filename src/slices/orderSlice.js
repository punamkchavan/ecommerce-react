import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const proxy = import.meta.env.VITE_PROXY || "";

export const newOrderSlice = createSlice({
    name: "newOrder",
    initialState: {},
    reducers: {
        createOrderRequest: (state) => {
            state.loading = true;
        },
        createOrderSuccess: (state, action) => {
            state.loading = false;
            state.order = action.payload;
        },
        createOrderFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const myOrdersSlice = createSlice({
    name: "myOrders",
    initialState: { orders: [] },
    reducers: {
        myOrdersRequest: (state) => {
            state.loading = true;
        },
        myOrdersSuccess: (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        },
        myOrdersFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const allOrdersSlice = createSlice({
    name: "allOrders",
    initialState: { orders: [] },
    reducers: {
        allOrdersRequest: (state) => {
            state.loading = true;
        },
        allOrdersSuccess: (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        },
        allOrdersFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const orderSlice = createSlice({
    name: "order",
    initialState: {},
    reducers: {
        updateOrderRequest: (state) => {
            state.loading = true;
        },
        updateOrderSuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        updateOrderFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateOrderReset: (state) => {
            state.isUpdated = false;
        },
        deleteOrderRequest: (state) => {
            state.loading = true;
        },
        deleteOrderSuccess: (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        deleteOrderFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteOrderReset: (state) => {
            state.isDeleted = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const orderDetailsSlice = createSlice({
    name: "orderDetails",
    initialState: { order: {} },
    reducers: {
        orderDetailsRequest: (state) => {
            state.loading = true;
        },
        orderDetailsSuccess: (state, action) => {
            state.loading = false;
            state.order = action.payload;
        },
        orderDetailsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    createOrderRequest,
    createOrderSuccess,
    createOrderFail,
    clearErrors: clearNewOrderErrors,
} = newOrderSlice.actions;

export const {
    myOrdersRequest,
    myOrdersSuccess,
    myOrdersFail,
    clearErrors: clearMyOrdersErrors,
} = myOrdersSlice.actions;

export const {
    allOrdersRequest,
    allOrdersSuccess,
    allOrdersFail,
    clearErrors: clearAllOrdersErrors,
} = allOrdersSlice.actions;

export const {
    updateOrderRequest,
    updateOrderSuccess,
    updateOrderFail,
    updateOrderReset,
    deleteOrderRequest,
    deleteOrderSuccess,
    deleteOrderFail,
    deleteOrderReset,
    clearErrors: clearOrderErrors,
} = orderSlice.actions;

export const {
    orderDetailsRequest,
    orderDetailsSuccess,
    orderDetailsFail,
    clearErrors: clearOrderDetailsErrors,
} = orderDetailsSlice.actions;

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch(createOrderRequest());
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        };
        const { data } = await axios.post(`${proxy}/api/v1/order/new`, order, config);
        dispatch(createOrderSuccess(data));
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message));
    }
};

export const myOrders = () => async (dispatch) => {
    try {
        dispatch(myOrdersRequest());
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: token,
            },
        };
        const { data } = await axios.get(`${proxy}/api/v1/orders/me`, config);
        dispatch(myOrdersSuccess(data.orders));
    } catch (error) {
        dispatch(myOrdersFail(error.response.data.message));
    }
};

export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch(allOrdersRequest());
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: token,
            },
        };
        const { data } = await axios.get(`${proxy}/api/v1/admin/orders`, config);
        dispatch(allOrdersSuccess(data.orders));
    } catch (error) {
        dispatch(allOrdersFail(error.response.data.message));
    }
};

export const updateOrder = (id, order) => async (dispatch) => {
    try {
        dispatch(updateOrderRequest());
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        };
        const { data } = await axios.put(
            `${proxy}/api/v1/admin/order/${id}`,
            order,
            config
        );
        dispatch(updateOrderSuccess(data.success));
    } catch (error) {
        dispatch(updateOrderFail(error.response.data.message));
    }
};

export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch(deleteOrderRequest());
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: token,
            },
        };
        const { data } = await axios.delete(
            `${proxy}/api/v1/admin/order/${id}`,
            config
        );
        dispatch(deleteOrderSuccess(data.success));
    } catch (error) {
        dispatch(deleteOrderFail(error.response.data.message));
    }
};

export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch(orderDetailsRequest());
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: token,
            },
        };
        const { data } = await axios.get(`${proxy}/api/v1/order/${id}`, config);
        dispatch(orderDetailsSuccess(data.order));
    } catch (error) {
        dispatch(orderDetailsFail(error.response.data.message));
    }
};

export const newOrderReducer = newOrderSlice.reducer;
export const myOrdersReducer = myOrdersSlice.reducer;
export const allOrdersReducer = allOrdersSlice.reducer;
export const orderReducer = orderSlice.reducer;
export const orderDetailsReducer = orderDetailsSlice.reducer;
