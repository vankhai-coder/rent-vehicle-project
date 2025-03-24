import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/userSlice'
import userProfileReducer from '../features/userProfileSlice'
import motobikeReducer from '../features/motobikeSlice'
import bookingReducer from '../features/bookingSlice'

export const store = configureStore({
  reducer: {
    // for customer : 
    user: userReducer,
    userProfile: userProfileReducer,
    motobike : motobikeReducer ,
    booking : bookingReducer 
    // for other : 
  },
});
