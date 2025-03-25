import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    motobikes: [],
    loading: false,
    error: null,
};

// Async function to fetch all motobikes
export const getAllMotobikes = createAsyncThunk(
    "motobikes/getAllMotobikes",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/owner/motobike");
            return response.data; // Assuming the response is a list of motobikes
        } catch (error) {
            console.error("Error fetching motobikes:", error);
            return rejectWithValue(error.response?.data?.message || "Error fetching motobikes");
        }
    }
);

// Redux slice
const motobikeSlice = createSlice({
    name: "motobikes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle fetching motobikes
            .addCase(getAllMotobikes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllMotobikes.fulfilled, (state, action) => {
                state.loading = false;
                state.motobikes = action.payload; // Store motobikes in the state
                state.error = null;
            })
            .addCase(getAllMotobikes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export the reducer
export default motobikeSlice.reducer;
