import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: '',
    role: ''
};

// async function : 
const loginUser = createAsyncThunk('user/loginUser' , )

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state) => {

        },
        register: (state) => {

        },
        logout: (state) => {

        }
    } ,
    extraReducers
})

export const { login, register, logout } = userSlice.actions
export default userSlice.reducer
