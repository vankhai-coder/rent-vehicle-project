import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/userSlice'
import userProfileReducer from '../features/userProfile'

export const store = configureStore({
  reducer: {
    user: userReducer,
    userProfile: userProfileReducer,
  },
});
