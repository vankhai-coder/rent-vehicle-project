import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    motobikes: [],
    loading: false,
    error: null,
    errorMessage: "",
    districts: [],
    motobikeTypes: [],
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
// Async function to get unique districts
export const getUniqueDistricts = createAsyncThunk(
    'motorbike/getUniqueDistricts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/api/customer/search/getUniqueDistricts');
            return response.data;
        } catch (error) {
            console.log('Error fetching unique districts:', error);
            return rejectWithValue(error.response?.data?.message || 'Error fetching unique districts');
        }
    }
);

// Async function to get unique motorbike type names
export const getUniqueMotobikeTypeNames = createAsyncThunk(
    'motorbike/getUniqueMotobikeTypeNames',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/api/customer/search/getUniqueMotobikeTypeNames');
            return response.data;
        } catch (error) {
            console.log('Error fetching unique motorbike type names:', error);
            return rejectWithValue(error.response?.data?.message || 'Error fetching unique motorbike type names');
        }
    }
);

// Async function to delete a motobike
export const deleteMotobike = createAsyncThunk('motorbike/deleteMotobike', async (motobikeId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/api/motobikes/${motobikeId}`);
        return response.data;
    } catch (error) {
        console.log('error when deleting motobike:', error);
        return rejectWithValue(error.response?.data?.message || 'Error when deleting motobike');
    }
});

// Async function to get all motobikes
export const getMotobikes = createAsyncThunk('motorbike/getMotobikes', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('/api/motobikes');
        return response.data;
    } catch (error) {
        console.log('error when fetching motobikes:', error);
        return rejectWithValue(error.response?.data?.message || 'Error when fetching motobikes');
    }
});

const motobikeSlice = createSlice({
    name: 'motorbike',
    initialState,
    reducers: {
        sortByPrice(state, action) {
            const { payload } = action; // 'lowest' or 'highest'
            console.log('payload : ', payload);

            state.motobikes.sort((a, b) =>
                payload === "lowest" ? a.price - b.price : b.price - a.price
            );
        }
    },
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
                state.motobikes = []
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
                state.motobikes = []

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
                state.motobikes = []

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
                state.motobikes = []

                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload;
            })
            // Handle unique districts
            .addCase(getUniqueDistricts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUniqueDistricts.fulfilled, (state, action) => {
                state.districts = action.payload;
                state.loading = false;
            })
            .addCase(getUniqueDistricts.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload;
            })
            // Handle unique motorbike type names
            .addCase(getUniqueMotobikeTypeNames.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUniqueMotobikeTypeNames.fulfilled, (state, action) => {
                state.motobikeTypes = action.payload;
                state.loading = false;
            })
            .addCase(getUniqueMotobikeTypeNames.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload;
            });
    }
});

export const { sortByPrice } = motobikeSlice.actions

export default motobikeSlice.reducer;
