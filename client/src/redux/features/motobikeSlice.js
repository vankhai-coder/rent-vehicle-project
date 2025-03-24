import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    motobikes: [],
    loading: false,
    error: null,
    errorMessage: "",
};

// Async function for searching motobikes by booked dates:
export const searchByDates = createAsyncThunk('motorbike/searchByDates', async ({ dates }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/api/customer/search/booked-dates', { dates });
        return response.data;
    } catch (error) {
        console.log('error when searching by dates:', error);
        return rejectWithValue(error.response?.data?.message || 'Error when searching by dates');
    }
});

// Async function for searching motobikes by dates and district:
export const searchByDatesAndDistrict = createAsyncThunk('motorbike/searchByDatesAndDistrict', async ({ district, dates }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/api/customer/search/dates-district', { district, dates });
        return response.data;
    } catch (error) {
        console.log('error when searching by dates and district:', error);
        return rejectWithValue(error.response?.data?.message || 'Error when searching by dates and district');
    }
});

// Async function for searching motobikes by dates and type:
export const searchByDatesAndType = createAsyncThunk('motorbike/searchByDatesAndType', async ({ dates, motobikeTypeName }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/api/customer/search/dates-type', { dates, motobikeTypeName });
        return response.data;
    } catch (error) {
        console.log('error when searching by dates and type:', error);
        return rejectWithValue(error.response?.data?.message || 'Error when searching by dates and type');
    }
});


// Async function for searching motobikes by dates, type, and district:
export const searchByDatesTypeDistrict = createAsyncThunk('motorbike/searchByDatesTypeDistrict', async ({ district, motobikeTypeName, dates }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/api/customer/search/district-dates-motobike-type', { district, motobikeTypeName, dates });
        return response.data;
    } catch (error) {
        console.log('error when searching by dates, type, and district:', error);
        return rejectWithValue(error.response?.data?.message || 'Error when searching by dates, type, and district');
    }
});

const motobikeSlice = createSlice({
    name: 'motorbike',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchByDates.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.errorMessage = "";
            })
            .addCase(searchByDates.fulfilled, (state, action) => {
                state.motobikes = action.payload;
                state.loading = false;
                state.error = false;
                state.errorMessage = "";
            })
            .addCase(searchByDates.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload;
            })
            .addCase(searchByDatesAndDistrict.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.errorMessage = "";
            })
            .addCase(searchByDatesAndDistrict.fulfilled, (state, action) => {
                state.motobikes = action.payload;
                state.loading = false;
                state.error = false;
                state.errorMessage = "";
            })
            .addCase(searchByDatesAndDistrict.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload;
            })
            .addCase(searchByDatesAndType.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.errorMessage = "";
            })
            .addCase(searchByDatesAndType.fulfilled, (state, action) => {
                state.motobikes = action.payload;
                state.loading = false;
                state.error = false;
                state.errorMessage = "";
            })
            .addCase(searchByDatesAndType.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload;
            })
            .addCase(searchByDatesTypeDistrict.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.errorMessage = "";
            })
            .addCase(searchByDatesTypeDistrict.fulfilled, (state, action) => {
                state.motobikes = action.payload;
                state.loading = false;
                state.error = false;
                state.errorMessage = "";
            })
            .addCase(searchByDatesTypeDistrict.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload;
            })
    }
});

export default motobikeSlice.reducer;
