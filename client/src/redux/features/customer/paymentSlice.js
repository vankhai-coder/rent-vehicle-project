import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    sessionId: null,
    checkoutUrl: null,
    paymentStatus: 'idle', // idle, loading, succeeded, failed
    error: null,
    loading: false,
    bookingStatus: null,
};

export const getPaymentStatus = createAsyncThunk(
    "payment/getPaymentStatus",
    async (paymentIntentId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/api/customer/payment/payment-status/${paymentIntentId}`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

export const getBookingStatusBySession = createAsyncThunk(
    "payment/getBookingStatusBySession",
    async (sessionId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/api/customer/payment/booking-status/${sessionId}`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

export const createCheckoutSession = createAsyncThunk(
    "payment/createCheckoutSession",
    async (paymentData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/api/customer/payment/create-checkout-session", paymentData);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        clearPayment(state) {
            state.sessionId = null;
            state.checkoutUrl = null;
            state.paymentStatus = 'idle';
            state.error = null;
            state.loading = false;
            state.bookingStatus = null;
        },
        setPaymentStatus(state, action) {
            state.paymentStatus = action.payload;
        },
        setSessionId(state, action) {
            state.sessionId = action.payload;
        },
        setCheckoutUrl(state, action) {
            state.checkoutUrl = action.payload;
        },
        setBookingStatus(state, action) {
            state.bookingStatus = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCheckoutSession.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCheckoutSession.fulfilled, (state, action) => {
                state.loading = false;
                state.sessionId = action.payload.sessionId;
                state.checkoutUrl = action.payload.url;
                state.paymentStatus = 'pending';
            })
            .addCase(createCheckoutSession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.paymentStatus = 'failed';
            })
            .addCase(getPaymentStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPaymentStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentStatus = action.payload.status;
            })
            .addCase(getPaymentStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getBookingStatusBySession.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBookingStatusBySession.fulfilled, (state, action) => {
                state.loading = false;
                state.bookingStatus = action.payload.booking;
                state.paymentStatus = action.payload.booking.paymentStatus;
            })
            .addCase(getBookingStatusBySession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearPayment, setPaymentStatus, setSessionId, setCheckoutUrl, setBookingStatus } = paymentSlice.actions;
export default paymentSlice.reducer; 