import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    motobikes: [],
    storeLocations: [],
    motobikeTypes: [],
    addons: [],
    loading: false,
    error: null,
    success: false, // For creation success feedback
    createMotobikeSuccess: false
};

// Async function to create a new motobike
export const createMotobike = createAsyncThunk(
    "motobikes/createMotobike",
    async ({ vehicleNumber, motobikeType, freeAddons, storeLocation, pricePerDay }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/api/owner/motobike", {
                vehicleNumber,
                motobikeType,
                freeAddons,
                storeLocation,
                pricePerDay,
            });
            return response.data; // Assuming the response is the created motobike
        } catch (error) {
            console.error("Error creating motobike:", error);
            return rejectWithValue(error.response?.data?.message || "Error creating motobike");
        }
    }
);

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

// Redux slice
const motobikeSlice = createSlice({
    name: "motobikes",
    initialState,
    reducers: {
        // Reset success state for UI purposes
        resetSuccess: (state) => {
            state.createMotobikeSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder
        builder
            // Handle creating a new motobike
            .addCase(createMotobike.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createMotobike.fulfilled, (state, action) => {
                state.loading = false;
                state.motobikes.shift(action.payload); // Add new motobike to state
                state.error = null;
                state.success = true;
                state.createMotobikeSuccess = true
            })
            .addCase(createMotobike.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            // Handle fetching all store locations
            .addCase(getAllStoreLocations.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(getAllStoreLocations.fulfilled, (state, action) => {
                state.loading = false;
                state.storeLocations = action.payload;
                state.error = null; // Clear error explicitly
            })
            .addCase(getAllStoreLocations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            // Handle fetching all addons
            .addCase(getAllAddOns.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllAddOns.fulfilled, (state, action) => {
                state.loading = false;
                state.addons = action.payload;
                state.error = null; // Clear error explicitly
            })
            .addCase(getAllAddOns.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Handle fetching motobike types
            .addCase(getAllMotobikeTypes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllMotobikeTypes.fulfilled, (state, action) => {
                state.loading = false;
                state.motobikeTypes = action.payload;
                state.error = null; // Clear error explicitly
            })
            .addCase(getAllMotobikeTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


    },
});

// Export the reducer and actions
export const { resetSuccess } = motobikeSlice.actions;
export default motobikeSlice.reducer;
