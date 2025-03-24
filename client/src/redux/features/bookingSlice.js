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
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
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
});

// Tạo hành động bất đồng bộ để xóa booking
export const deleteBooking = createAsyncThunk('booking/deleteBooking', async (bookingId, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/bookings/${bookingId}`);
        return response.data;
    } catch (error) {
        console.log('error when deleting booking:', error);
        return rejectWithValue(error.response?.data?.message || 'Error when deleting booking');
    }
});

// Tạo hành động bất đồng bộ để lấy danh sách booking
export const getBookings = createAsyncThunk('booking/getBookings', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/bookings');
        return response.data;
    } catch (error) {
        console.log('error when fetching bookings:', error);
        return rejectWithValue(error.response?.data?.message || 'Error when fetching bookings');
    }
});



export const { setBookedDate, createBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
