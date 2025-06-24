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
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/api/customer/booking`);
            return response.data;
        } catch (error) {
            console.error("Error fetching customer bookings: ", error);
            return rejectWithValue(error.response?.data?.message || "Error fetching bookings");
        }
    }
);

// Async function to cancel booking
export const cancelBooking = createAsyncThunk(
    "bookings/cancelBooking",
    async (bookingId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`/api/customer/booking/${bookingId}/cancel`);
            return response.data;
        } catch (error) {
            console.error("Error canceling booking: ", error);
            return rejectWithValue(error.response?.data?.message || "Error canceling booking");
        }
    }
);

// Redux slice
const bookingsSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {
        clearBookings: (state) => {
            state.bookings = [];
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch bookings
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
            })
            // Cancel booking
            .addCase(cancelBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cancelBooking.fulfilled, (state, action) => {
                state.loading = false;
                const updatedBooking = action.payload.data;
                const index = state.bookings.findIndex(b => b._id === updatedBooking._id);
                if (index !== -1) {
                    state.bookings[index].status = updatedBooking.status;
                    state.bookings[index].paymentStatus = updatedBooking.paymentStatus;
                }
            })
            .addCase(cancelBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearBookings } = bookingsSlice.actions;
export default bookingsSlice.reducer;