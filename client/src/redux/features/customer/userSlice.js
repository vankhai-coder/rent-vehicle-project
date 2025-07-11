import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    role: null,
    loading: false,
    error: null,
    errorMessage: '',
    userImage: '',
    updatePasswordSuccess: false,
    fullName: '',
    email: '',
    verifyAccountFail: '' ,
    resendEmailSuccess : '',
    sendVerifyEmailWhenRegisterSuccess : '',
    unverifyAccount : ''
    
};

// Async function for user login:
export const loginUserByEmail = createAsyncThunk('user/loginUserByEmail', async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/api/auth/login', { email, password })
        return response.data
    } catch (error) {
        console.log('error when login user by email: ', error);
        return rejectWithValue(error.response?.data?.message || 'Error when login user by email')
    }
})
// Async function for get user : 
export const getUser = createAsyncThunk('user/login/getUser', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('/api/auth/getUser')
        return response.data
    } catch (error) {
        console.log('error when get user : ', error);
        return rejectWithValue(error.response?.data?.message || 'Error when get user')
    }
})
// Async function for user registration:
export const registerUser = createAsyncThunk('user/registerUser', async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/api/auth/register', { email, password });
        return response.data;
    } catch (error) {
        console.log('error when registering user:', error);
        return rejectWithValue(error.response?.data?.message || 'Error when registering');
    }
});
// Async funtion for verify account : 
export const verifyAccount = createAsyncThunk('user/verify-account', async ({ userId, verifyToken }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/api/auth/verify-account', { userId, verifyToken })
        return response.data
    } catch (error) {
        console.log('error when verify account : ', error.message);
        return rejectWithValue('Error when verify account!')
    }
})

// Async function for resend verify account : 
export const resendVerifyAccount = createAsyncThunk('user/resend-verify-account', async ({ email }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/api/auth/resend-verify-email', { email })
        return response.data
    } catch (error) {
        console.log('error when resend verify account email : ', error.message);
        return rejectWithValue(error?.response?.data?.message || 'Error when resend verify account email')
    }
})
// Async function for logout:
export const logoutUser = createAsyncThunk('user/logoutUser', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/api/auth/logout');
        return response.data;
    } catch (error) {
        console.log('error when logging out:', error);
        return rejectWithValue(error.response?.data?.message || 'Error when logging out');
    }
});
// Async function for updating the password:
export const updatePassword = createAsyncThunk('user/updatePassword', async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/api/auth/update-password', { currentPassword, newPassword });
        return response.data;
    } catch (error) {
        console.log('error when updating password:', error);
        return rejectWithValue(error.response?.data?.message || 'Error when updating password');
    }
});


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUpdatePasswordFalse: (state) => {
            state.updatePasswordSuccess = false
        },
        resetUser: (state) => {
            state.userId = null
            state.role = null
            state.loading = false
            state.error = null
            state.errorMessage = ''
            state.userImage = ''
            state.updatePasswordSuccess = false
            state.fullName = ''
            state.email = ''
        }
    },
    extraReducers: (builder) => {
        builder
            // login with email: 
            .addCase(loginUserByEmail.pending, (state) => {
                state.userId = null
                state.role = null
                state.loading = true
                state.error = false
                state.errorMessage = ''
                state.userImage = ''
            })
            .addCase(loginUserByEmail.fulfilled, (state, action) => {
                state.userId = action.payload.user.userId
                state.role = action.payload.user.role
                state.loading = false
                state.error = false
                state.errorMessage = ''
                state.userImage = action.payload.user.userImage
                state.fullName = action.payload.user.fullName
                state.email = action.payload.user.email
            })
            .addCase(loginUserByEmail.rejected, (state, action) => {
                state.userId = null
                state.role = null
                state.loading = false
                state.error = true
                state.errorMessage = action.payload
                state.userImage = ''
                state.unverifyAccount = true
            })
            // get user : 
            .addCase(getUser.pending, (state) => {
                state.userId = null
                state.role = null
                state.loading = true
                state.error = false
                state.errorMessage = ''
                state.userImage = ''
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.userId = action.payload.user.userId
                state.role = action.payload.user.role
                state.loading = false
                state.error = false
                state.errorMessage = ''
                state.userImage = action.payload.user.userImage
                state.fullName = action.payload.user.fullName
                state.email = action.payload.user.email
            })
            .addCase(getUser.rejected, (state, action) => {
                state.userId = null
                state.role = null
                state.loading = false
                state.error = true
                state.errorMessage = action.payload
                state.userImage = ''
            })
            // register: 
            .addCase(registerUser.pending, (state) => {
                state.userId = null;
                state.role = null;
                state.loading = true;
                state.error = false;
                state.errorMessage = ''
                state.userImage = ''
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.userId = action.payload.userId
                state.role = '';
                state.loading = false;
                state.error = false;
                state.errorMessage = '';
                state.userImage = ''
                state.fullName = ''
                state.email = ''
                state.sendVerifyEmailWhenRegisterSuccess = true
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.userId = null;
                state.role = null;
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload;
                state.userImage = ''
                state.verifyAccountFail = true
            })
            // verify account : 
            .addCase(verifyAccount.pending, (state) => {
                state.userId = null;
                state.role = null;
                state.loading = true;
                state.error = false;
                state.errorMessage = ''
                state.userImage = ''
            })
            .addCase(verifyAccount.fulfilled, (state, action) => {
                state.userId = action.payload.user.userId
                state.role = action.payload.user.role
                state.loading = false
                state.error = false
                state.errorMessage = ''
                state.userImage = action.payload.user.userImage
                state.fullName = action.payload.user.fullName
                state.email = action.payload.user.email
            })
            .addCase(verifyAccount.rejected, (state, action) => {
                state.userId = null;
                state.role = null;
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload;
                state.userImage = ''
                state.verifyAccountFail = true
            })
            // resend verify email : 
            .addCase(resendVerifyAccount.pending, (state) => {
                state.userId = null;
                state.role = null;
                state.loading = true;
                state.error = false;
                state.errorMessage = ''
                state.userImage = ''
                state.resendEmailSuccess = false
            })
            .addCase(resendVerifyAccount.fulfilled, (state) => {
                state.loading = false
                state.error = false
                state.errorMessage = ''
                state.resendEmailSuccess = true 
            })
            .addCase(resendVerifyAccount.rejected, (state, action) => {
                state.userId = null;
                state.role = null;
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload;
                state.userImage = ''
                state.verifyAccountFail = true
                state.resendEmailSuccess = false 
            })
            // logout:
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.errorMessage = '';
                state.userImage = ''
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.userId = null;
                state.role = null;
                state.loading = false;
                state.error = false;
                state.errorMessage = '';
                state.userImage = ''
                state.fullName = ''
                state.email = ''
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload;
            })
            // update password:
            .addCase(updatePassword.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.errorMessage = '';
                state.updatePasswordSuccess = false

            })
            .addCase(updatePassword.fulfilled, (state) => {
                state.loading = false;
                state.error = false;
                state.errorMessage = '';
                state.updatePasswordSuccess = true
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload;
                state.updatePasswordSuccess = false

            });

    }
})

export const { setUpdatePasswordFalse, resetUser } = userSlice.actions
export default userSlice.reducer
