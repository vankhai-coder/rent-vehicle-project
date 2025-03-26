import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    accounts: [],
    loading: false,
    error: null,
};

// Async function to fetch accounts based on role
export const fetchAccountsByRole = createAsyncThunk(
    "accounts/fetchAccountsByRole",
    async (roleToFind, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/api/admin/view/account`, {
              roleToFind
            });
            return response.data; // Assuming the response contains the accounts list
        } catch (error) {
            console.error("Error fetching accounts: ", error);
            return rejectWithValue(error.response?.data?.message || "Error fetching accounts");
        }
    }
);


export const banAccount = createAsyncThunk(
    "accounts/banAccount",
    async (banId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/api/admin/view/ban-account", { banId });
            return response.data; // Assuming the response contains a success message or details
        } catch (error) {
            console.error("Error banning account: ", error.message);
            return rejectWithValue(error.response?.data?.message || "Failed to ban account");
        }
    }
);

// Redux slice
const accountsSlice = createSlice({
    name: "accounts",
    initialState,
    reducers: {
        // Add any non-async actions here (if needed)
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccountsByRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAccountsByRole.fulfilled, (state, action) => {
                state.loading = false;
                state.accounts = action.payload;
                state.error = null;
            })
            .addCase(fetchAccountsByRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(banAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(banAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message || "Account banned successfully.";
                state.error = null;
            })
            .addCase(banAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

// Export slice reducer
export default accountsSlice.reducer;
