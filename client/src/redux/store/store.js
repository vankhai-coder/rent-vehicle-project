import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/customer/userSlice'
import userProfileReducer from '../features/customer/userProfileSlice'
import motobikeReducer from '../features/customer/motobikeSlice'
import bookingReducer from '../features/customer/bookingSlice'
import billReducer from '../features/customer/billSlice'

export const store = configureStore({
  reducer: {
    // for customer : 
    user: userReducer,
    userProfile: userProfileReducer,
    motobike : motobikeReducer ,
    booking : bookingReducer ,
    bill : billReducer
    // for other : 
  },
});
