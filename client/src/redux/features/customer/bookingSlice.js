import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    image: "",
    price: "",
    name: "",
    district: "",
    ownerId: "",
    motobike: "",
    height: "",
    weight: "",
    bookedDate: "",
    loading: false,
    error: false,
    success: false,
    bookings: [], // Add bookings array to store fetched bookings
};

export const reserveBooking = createAsyncThunk(
    "booking/reserveBooking",
    async (bookingData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/api/customer/booking", bookingData);
            return response.data;
        } catch (error) {
            console.log(error);

            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

// Tạo hành động bất đồng bộ để xóa booking
export const deleteBooking = createAsyncThunk('booking/deleteBooking', async (bookingId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/api/customer/booking/${bookingId}`);
        return {
            success: response.data.success,
            message: response.data.message,
            bookingId: bookingId // Thêm bookingId để có thể xóa khỏi state
        };
    } catch (error) {
        console.log('error when deleting booking:', error);
        return rejectWithValue(error.response?.data?.message || 'Error when deleting booking');
    }
});

// Tạo hành động bất đồng bộ để lấy danh sách booking
export const getBookings = createAsyncThunk('booking/getBookings', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('/api/customer/booking');
        return response.data;
    } catch (error) {
        console.log('error when fetching bookings:', error);
        return rejectWithValue(error.response?.data?.message || 'Error when fetching bookings');
    }
});


const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        clearBooking(state) {
            state.image = '';
            state.price = '';
            state.name = '';
            state.district = '';
            state.ownerId = '';
            state.motobike = '';
            state.height = '';
            state.weight = '';
            state.bookedDate = ""

        },
        setBookedDate(state, action) {
            state.bookedDate = action.payload; // Update bookedDate
        },
        createBooking(state, action) {
            const { image, price, name, district, ownerId, motobike, height, weight } = action.payload;
            state.image = image;
            state.price = price;
            state.name = name;
            state.district = district;
            state.ownerId = ownerId;
            state.motobike = motobike;
            state.height = height;
            state.weight = weight;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle reserve booking
            .addCase(reserveBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(reserveBooking.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(reserveBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Handle get bookings
            .addCase(getBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload;
            })
            .addCase(getBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Handle delete booking
            .addCase(deleteBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = state.bookings.filter(booking => booking._id !== action.meta.arg);
            })
            .addCase(deleteBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },

});

export const { setBookedDate, createBooking, clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
