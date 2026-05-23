import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const proxy = import.meta.env.VITE_PROXY || "";

export const login = createAsyncThunk(
    "user/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const config = { headers: { "Content-Type": "application/json" } };
            const { data } = await axios.post(
                `${proxy}/api/v1/login`,
                { email, password },
                config
            );
            localStorage.setItem("token", data.token);
            localStorage.setItem("isAuthenticated", "true");
            return data.user;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const register = createAsyncThunk(
    "user/register",
    async (userData, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };
            const { data } = await axios.post(`${proxy}/api/v1/register`, userData, config);
            localStorage.setItem("token", data.token);
            localStorage.setItem("isAuthenticated", "true");
            return data.user;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const loadUser = createAsyncThunk(
    "user/loadUser",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: token
                },
            };
            const { data } = await axios.get(`${proxy}/api/v1/me`, config);
            return data.user;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const logout = createAsyncThunk(
    "user/logout",
    async (_, { rejectWithValue }) => {
        try {
            await axios.get(`${proxy}/api/v1/logout`);
            localStorage.removeItem("token");
            localStorage.removeItem("isAuthenticated");
            return null;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const updateProfile = createAsyncThunk(
    "profile/updateProfile",
    async (userData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: token
                }
            };
            const { data } = await axios.put(`${proxy}/api/v1/me/update`, userData, config);
            return data.success;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const updatePassword = createAsyncThunk(
    "profile/updatePassword",
    async (passwords, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            };
            const { data } = await axios.put(
                `${proxy}/api/v1/password/update`,
                passwords,
                config
            );
            return data.success;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const forgotPassword = createAsyncThunk(
    "forgotPassword/forgotPassword",
    async (email, { rejectWithValue }) => {
        try {
            const config = {
                headers: { "Content-Type": "application/json" }
            };
            const { data } = await axios.post(`${proxy}/api/v1/password/forgot`, email, config);
            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const resetPassword = createAsyncThunk(
    "forgotPassword/resetPassword",
    async ({ token, passwords }, { rejectWithValue }) => {
        try {
            const config = { headers: { "Content-Type": "application/json" } };
            const { data } = await axios.put(
                `${proxy}/api/v1/password/reset/${token}`,
                passwords,
                config
            );
            return data.success;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getAllUsers = createAsyncThunk(
    "allUsers/getAllUsers",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: token
                }
            };
            const { data } = await axios.get(`${proxy}/api/v1/admin/users`, config);
            return data.users;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getUserDetails = createAsyncThunk(
    "userDetails/getUserDetails",
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: token
                }
            };
            const { data } = await axios.get(`${proxy}/api/v1/admin/user/${id}`, config);
            return data.user;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    "profile/updateUser",
    async ({ id, userData }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json"
                }
            };
            const { data } = await axios.put(
                `${proxy}/api/v1/admin/user/${id}`,
                userData,
                config
            );
            return data.success;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "profile/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: token
                }
            };
            const { data } = await axios.delete(`${proxy}/api/v1/admin/user/${id}`, config);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: false,
        isAuthenticated: false,
        error: null,
    },
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.isAuthenticated = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.isAuthenticated = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            })
            .addCase(loadUser.pending, (state) => {
                state.loading = true;
                state.isAuthenticated = false;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        loading: false,
        isUpdated: false,
        isDeleted: false,
        message: null,
        error: null,
    },
    reducers: {
        updateProfileReset: (state) => {
            state.isUpdated = false;
        },
        updatePasswordReset: (state) => {
            state.isUpdated = false;
        },
        updateUserReset: (state) => {
            state.isUpdated = false;
        },
        deleteUserReset: (state) => {
            state.isDeleted = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.isUpdated = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updatePassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.isUpdated = action.payload;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isUpdated = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isDeleted = action.payload.success;
                state.message = action.payload.message;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState: {
        loading: false,
        message: null,
        success: false,
        error: null,
    },
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const allUsersSlice = createSlice({
    name: "allUsers",
    initialState: {
        users: [],
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
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState: {
        user: {},
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
            .addCase(getUserDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearErrors: clearUserErrors } = userSlice.actions;
export const { updateProfileReset, updatePasswordReset, updateUserReset, deleteUserReset, clearErrors: clearProfileErrors } = profileSlice.actions;
export const { clearErrors: clearForgotPasswordErrors } = forgotPasswordSlice.actions;
export const { clearErrors: clearAllUsersErrors } = allUsersSlice.actions;
export const { clearErrors: clearUserDetailsErrors } = userDetailsSlice.actions;

export const userReducer = userSlice.reducer;
export const profileReducer = profileSlice.reducer;
export const forgotPasswordReducer = forgotPasswordSlice.reducer;
export const allUsersReducer = allUsersSlice.reducer;
export const userDetailsReducer = userDetailsSlice.reducer;
