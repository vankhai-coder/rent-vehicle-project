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
            });
    },

});

export const { setBookedDate, createBooking ,clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
