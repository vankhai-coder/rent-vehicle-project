import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

const initialState = {
    storeLocations: [],
    loading: false,
    error: null,
    success: false,
};

// Async function to fetch all store locations
export const getAllStoreLocations = createAsyncThunk(
    "storeLocations/getAllStoreLocations",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/owner/store-location");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error fetching store locations");
        }
    }
);

// Redux slice
const storeLocationSlice = createSlice({
    name: "storeLocations",
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllStoreLocations.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;

            })
            .addCase(getAllStoreLocations.fulfilled, (state, action) => {
                state.loading = false;
                state.storeLocations = action.payload;

            })
            .addCase(getAllStoreLocations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;

            })
           
    },
});

export const { resetSuccess } = storeLocationSlice.actions;
export default storeLocationSlice.reducer;