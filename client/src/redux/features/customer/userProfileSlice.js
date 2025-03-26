import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullName: '',
    age: '',
    phone: '',
    gender: '',
    address: '',
    commune: '',
    district: '',
    province: '',
    image: '',
    driverLicense: '',
    identityCard: '',
    role: '',
    registered: "",
    loading: false,
    error: null,
    errorMessage: '',
};

// Async function for getting user profile:
export const getUserProfile = createAsyncThunk(
    'user/getUserProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/api/auth/user-profile');
            console.log('User profile:', response.data);
            
            return response.data;
        } catch (error) {
            console.log('Error when getting user profile:', error);
            return rejectWithValue(
                error.response?.data?.message || 'Error when getting user profile'
            );
        }
    }
);

// Async function for updating user profile:
export const updateUserProfile = createAsyncThunk(
    'user/updateUserProfile',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch('/api/auth/user-profile', data);
            return response.data;
        } catch (error) {
            console.log('Error when updating user profile:', error);
            return rejectWithValue(
                error.response?.data?.message || 'Error when updating user profile'
            );
        }
    }
);

// Thêm action mới để cập nhật registered thành "pending"
export const registerAsOwner = createAsyncThunk(
    'user/registerAsOwner',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch('/api/auth/user-profile', { registered: "pending" });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error registering as owner');
        }
    }
);

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        resetUserProfile: (state) => {
            state.fullName = '';
            state.age = '';
            state.phone = '';
            state.gender = '';
            state.address = '';
            state.commune = '';
            state.district = '';
            state.province = '';
            state.image = '';
            state.driverLicense = '';
            state.identityCard = '';
            state.loading = false;
            state.error = null;
            state.errorMessage = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserProfile.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.fullName = payload.user.fullName;
                state.age = payload.user.age;
                state.phone = payload.user.phone;
                state.gender = payload.user.gender;
                state.address = payload.user.address;
                state.commune = payload.user.commune;
                state.district = payload.user.district;
                state.province = payload.user.province;
                state.image = payload.user.image;
                state.driverLicense = payload.user.driverLicense;
                state.identityCard = payload.user.identityCard;
                state.role = payload.user.role;
                state.registered = payload.user.registered;
            })
            .addCase(getUserProfile.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = payload;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.fullName = payload.user.fullName;
                state.age = payload.user.age;
                state.phone = payload.user.phone;
                state.gender = payload.user.gender;
                state.address = payload.user.address;
                state.commune = payload.user.commune;
                state.district = payload.user.district;
                state.province = payload.user.province;
                state.image = payload.user.image;
                state.driverLicense = payload.user.driverLicense;
                state.identityCard = payload.user.identityCard;
                state.role = payload.user.role;

            })
            .addCase(updateUserProfile.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = payload;
            })
            .addCase(registerAsOwner.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerAsOwner.fulfilled, (state) => {
                state.loading = false;
                state.registered = "pending"; // Cập nhật registered khi nhấn nút
            })
            .addCase(registerAsOwner.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = payload;
            });
    },
});

export const { resetUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
