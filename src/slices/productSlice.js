import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const proxy = import.meta.env.VITE_PROXY || "";

export const getProduct = createAsyncThunk(
    "products/getProduct",
    async (params = {}, { rejectWithValue }) => {
        try {
            const { keyword = "", currentPage = 1, price = [0, 100000], category, ratings = 0 } = params;
            let link = `${proxy}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
            if (category) {
                link = `${proxy}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
            }
            const { data } = await axios.get(link);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getAdminProduct = createAsyncThunk(
    "products/getAdminProduct",
    async (_, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            };
            const { data } = await axios.get(`${proxy}/api/v1/admin/products`, config);
            return data.products;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getProductDetails = createAsyncThunk(
    "productDetails/getProductDetails",
    async (id, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            };
            const { data } = await axios.get(`${proxy}/api/v1/product/${id}`, config);
            return data.product;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const createProduct = createAsyncThunk(
    "newProduct/createProduct",
    async (productData, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: localStorage.getItem("token"),
                },
            };
            const { data } = await axios.post(`${proxy}/api/v1/admin/product/new`, productData, config);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async ({ id, productData }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: localStorage.getItem("token"),
                },
            };
            const { data } = await axios.put(`${proxy}/api/v1/admin/product/${id}`, productData, config);
            return data.success;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (id, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            };
            const { data } = await axios.delete(`${proxy}/api/v1/admin/product/${id}`, config);
            return data.success;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const newReview = createAsyncThunk(
    "newReview/newReview",
    async (reviewData, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            };
            const { data } = await axios.put(`${proxy}/api/v1/review`, reviewData, config);
            return data.success;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getAllReviews = createAsyncThunk(
    "productReviews/getAllReviews",
    async (id, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            };
            const { data } = await axios.get(`${proxy}/api/v1/reviews?id=${id}`, config);
            return data.reviews;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteReviews = createAsyncThunk(
    "review/deleteReviews",
    async ({ reviewId, productId }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            };
            const { data } = await axios.delete(`${proxy}/api/v1/reviews?id=${reviewId}&productId=${productId}`, config);
            return data.success;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.pending, (state) => {
                state.loading = true;
                state.products = [];
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.productsCount = action.payload.productsCount;
                state.resultPerPage = action.payload.resultPerPage;
                state.filteredProductsCount = action.payload.filteredProductsCount;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAdminProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAdminProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getAdminProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const productDetailsSlice = createSlice({
    name: "productDetails",
    initialState: {
        product: {},
        loading: false,
        error: null,
    },
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const newProductSlice = createSlice({
    name: "newProduct",
    initialState: {
        product: {},
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
        newProductReset: (state) => {
            state.success = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.product = action.payload.product;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const productSlice = createSlice({
    name: "product",
    initialState: {
        loading: false,
        isDeleted: false,
        isUpdated: false,
        error: null,
    },
    reducers: {
        deleteProductReset: (state) => {
            state.isDeleted = false;
        },
        updateProductReset: (state) => {
            state.isUpdated = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.isDeleted = action.payload;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.isUpdated = action.payload;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const newReviewSlice = createSlice({
    name: "newReview",
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
        newReviewReset: (state) => {
            state.success = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(newReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(newReview.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload;
            })
            .addCase(newReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const productReviewsSlice = createSlice({
    name: "productReviews",
    initialState: {
        reviews: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllReviews.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(getAllReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const reviewSlice = createSlice({
    name: "review",
    initialState: {
        loading: false,
        isDeleted: false,
        error: null,
    },
    reducers: {
        deleteReviewReset: (state) => {
            state.isDeleted = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteReviews.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.isDeleted = action.payload;
            })
            .addCase(deleteReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearErrors: clearProductsErrors } = productsSlice.actions;
export const { clearErrors: clearProductDetailsErrors } = productDetailsSlice.actions;
export const { newProductReset, clearErrors: clearNewProductErrors } = newProductSlice.actions;
export const { deleteProductReset, updateProductReset, clearErrors: clearProductErrors } = productSlice.actions;
export const { newReviewReset, clearErrors: clearNewReviewErrors } = newReviewSlice.actions;
export const { clearErrors: clearProductReviewsErrors } = productReviewsSlice.actions;
export const { deleteReviewReset, clearErrors: clearReviewErrors } = reviewSlice.actions;

export const productsReducer = productsSlice.reducer;
export const productDetailsReducer = productDetailsSlice.reducer;
export const newProductReducer = newProductSlice.reducer;
export const productReducer = productSlice.reducer;
export const newReviewReducer = newReviewSlice.reducer;
export const productReviewsReducer = productReviewsSlice.reducer;
export const reviewReducer = reviewSlice.reducer;
