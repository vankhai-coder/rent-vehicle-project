import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    role: null,
    loading: false,
    error: null,
    errorMessage: '',
    userImage: '',
    updatePasswordSuccess : false,
    fullName : '' , 
    email : '',
    registered: "",
    users: [] // Thêm mảng users vào initialState
};

// Async function for user login:
export const loginUser = createAsyncThunk('user/loginUser', async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/api/auth/login', { email, password })
        return response.data
    } catch (error) {
        console.log('error when login user : ', error);
        return rejectWithValue(error.response?.data?.message || 'Error when login')
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

// Async function for banning a user:
export const banUser = createAsyncThunk('user/banUser', async (userId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`/api/users/ban/${userId}`);
        return response.data;
    } catch (error) {
        console.log('error when banning user:', error);
        return rejectWithValue(error.response?.data?.message || 'Error when banning user');
    }
});

// Async function for getting users
export const getUsers = createAsyncThunk('user/getUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('/api/admin/users');
        return response.data.data; // Truy cập vào thuộc tính data của đối tượng JSON
    } catch (error) {
        console.log('error when fetching users:', error);
        return rejectWithValue(error.response?.data?.message || 'Error when fetching users');
    }
});

// Async function for updating the registered status of a user
export const updateUserRegistered = createAsyncThunk(
    'user/updateUserRegistered',
    async ({ userId, registered }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`/api/users/${userId}/update-registered`, { registered });
            return { userId, registered }; // Trả về userId và trạng thái mới
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error updating registered status');
        }
    }
);




const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUpdatePasswordFalse : (state)=> {
            state.updatePasswordSuccess  = false 
        } ,
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
            // login : 
            .addCase(loginUser.pending, (state) => {
                state.userId = null
                state.role = null
                state.loading = true
                state.error = false
                state.errorMessage = ''
                state.userImage = ''
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.userId = action.payload.user.userId
                state.role = action.payload.user.role
                state.loading = false
                state.error = false
                state.errorMessage = ''
                state.userImage = action.payload.user.userImage
                state.fullName = action.payload.user.fullName
                state.email = action.payload.user.email
            })
            .addCase(loginUser.rejected, (state, action) => {
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
                state.userId = action.payload.user.userId;
                state.role = action.payload.user.role;
                state.loading = false;
                state.error = false;
                state.errorMessage = '';
                state.userImage = action.payload.user.userImage
                state.fullName = action.payload.user.fullName
                state.email = action.payload.user.email
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.userId = null;
                state.role = null;
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload;
                state.userImage = ''
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

            })
             //get users:
             .addCase(getUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload; // Cập nhật state.users với dữ liệu từ API
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUserRegistered.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserRegistered.fulfilled, (state, action) => {
                state.loading = false;
                const { userId, registered } = action.payload;
                state.users = state.users.map(user =>
                    user._id === userId ? { ...user, registered } : user
                );
            })
            .addCase(updateUserRegistered.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const {setUpdatePasswordFalse , resetUser} = userSlice.actions
export default userSlice.reducer
