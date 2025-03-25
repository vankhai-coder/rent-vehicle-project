import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    motobikeTypes: [],
    loading: false,
    error: null,
    success: false, // For creation success feedback
};

// Async function to fetch all motobike types
export const getAllMotobikeTypes = createAsyncThunk(
    "motobikeTypes/getAllMotobikeTypes",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/owner/motobike-type");
            return response.data; // Assuming the response is a list of motobike types
        } catch (error) {
            console.error("Error fetching motobike types:", error);
            return rejectWithValue(error.response?.data?.message || "Error fetching motobike types");
        }
    }
);

// Async function to create a new motobike type
export const createMotobikeType = createAsyncThunk(
    "motobikeTypes/createMotobikeType",
    async ({ name, height, weight, image, color, description }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/api/owner/motobike-type", {
                name,
                height,
                weight,
                image,
                color,
                description,
            });
            return response.data; // Assuming the response is the created motobike type
        } catch (error) {
            console.error("Error creating motobike type:", error);
            return rejectWithValue(error.response?.data?.message || "Error creating motobike type");
        }
    }
);

// Redux slice
const motobikeTypeSlice = createSlice({
    name: "motobikeTypes",
    initialState,
    reducers: {
        // Reset success state for UI purposes
        resetSuccess: (state) => {
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle fetching motobike types
            .addCase(getAllMotobikeTypes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllMotobikeTypes.fulfilled, (state, action) => {
                state.loading = false;
                state.motobikeTypes = action.payload;
                state.error = null;
            })
            .addCase(getAllMotobikeTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Handle creating a new motobike type
            .addCase(createMotobikeType.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createMotobikeType.fulfilled, (state, action) => {
                state.loading = false;
                state.motobikeTypes.push(action.payload); // Add new type to state
                state.error = null;
                state.success = true;
            })
            .addCase(createMotobikeType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

// Export the reducer and actions
export const { resetSuccess } = motobikeTypeSlice.actions;
export default motobikeTypeSlice.reducer;
