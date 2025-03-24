import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/userSlice'
import userProfileReducer from '../features/userProfileSlice'
import motobikeReducer from '../features/motobikeSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    userProfile: userProfileReducer,
    motobike : motobikeReducer , 
  },
});
