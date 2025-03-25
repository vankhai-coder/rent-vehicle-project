import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    bookings: [],
    loading: false,
    error: null,
};

// Async function to fetch customer bookings
export const fetchCustomerBookings = createAsyncThunk(
    "bookings/fetchCustomerBookings",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/api/customer/booking`);
            return response.data; // Assuming the response returns the bookings list
        } catch (error) {
            console.error("Error fetching customer bookings: ", error);
            return rejectWithValue(error.response?.data?.message || "Error fetching bookings");
        }
    }
);

// Redux slice
const bookingsSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {
        // Add any non-async actions here (if needed)
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomerBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomerBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload;
                state.error = null;
            })
            .addCase(fetchCustomerBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export slice reducer
export default bookingsSlice.reducer;