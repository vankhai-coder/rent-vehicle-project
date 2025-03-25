import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    addons: [],
    loading: false,
    error: null,
    success: false, // For creation success feedback
};

// Async function to fetch all addons
export const getAllAddOns = createAsyncThunk(
    "addons/getAllAddOns",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/owner/add-on");
            return response.data; // Assuming the response is a list of addons
        } catch (error) {
            console.error("Error fetching addons:", error);
            return rejectWithValue(error.response?.data?.message || "Error fetching addons");
        }
    }
);

// Async function to create a new addon
export const createAddon = createAsyncThunk(
    "addons/createAddon",
    async ({ name, image }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/api/owner/add-on", { name, image });
            return response.data; // Assuming the response is the created addon
        } catch (error) {
            console.error("Error creating addon:", error);
            return rejectWithValue(error.response?.data?.message || "Error creating addon");
        }
    }
);

// Redux slice
const addonSlice = createSlice({
    name: "addons",
    initialState,
    reducers: {
        // Reset success state for UI purposes
        resetSuccess: (state) => {
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle fetching addons
            .addCase(getAllAddOns.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllAddOns.fulfilled, (state, action) => {
                state.loading = false;
                state.addons = action.payload;
                state.error = null;
            })
            .addCase(getAllAddOns.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Handle creating a new addon
            .addCase(createAddon.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createAddon.fulfilled, (state, action) => {
                state.loading = false;
                state.addons.push(action.payload); // Add new addon to state
                state.error = null;
                state.success = true;
            })
            .addCase(createAddon.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

// Export the reducer and actions
export const { resetSuccess } = addonSlice.actions;
export default addonSlice.reducer;
