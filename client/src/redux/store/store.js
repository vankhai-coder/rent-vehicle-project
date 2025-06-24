import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/customer/userSlice'
import userProfileReducer from '../features/customer/userProfileSlice'
import motobikeReducer from '../features/customer/motobikeSlice'
import bookingReducer from '../features/customer/bookingSlice'
import billReducer from '../features/customer/billSlice'
import paymentReducer from '../features/customer/paymentSlice'
import ownerAddonReducer from '../features/owner/addonSlice'
import ownerMotobikeTypeReducer from '../features/owner/motobikeTypeSlice'
import ownerStoreLocationReducer from '../features/owner/storeLocationSlice'
import ownerMotobikeReducer from '../features/owner/motobikeSlice'
import ownerViewAllBookingReducer from '../features/owner/bookingSlice'
import ownerCreateMotobikeReducer from '../features/owner/createMotobikeSlice'
import customerAccountReducer from '../features/admin/customerSlice'
import ownerAccountReducer from '../features/admin/ownerSlice'
import adminMotobikeReducer from '../features/admin/motobikeSlice'
import adminStoreReducer from '../features/admin/storeSlice'
import adminBookingReducer from '../features/admin/bookingSlice'

export const store = configureStore({
  reducer: {
    // for customer : 
    user: userReducer,
    userProfile: userProfileReducer,
    motobike: motobikeReducer,
    booking: bookingReducer,
    bill: billReducer,
    payment: paymentReducer,

    // for owner :
    owner_addon: ownerAddonReducer,
    owner_motobike_type: ownerMotobikeTypeReducer,
    owner_store: ownerStoreLocationReducer,
    owner_motobike: ownerMotobikeReducer,
    owner_booking: ownerViewAllBookingReducer,
    owner_create_motobike : ownerCreateMotobikeReducer,

    // admin : 
    admin_account_customer : customerAccountReducer,
    admin_account_owner : ownerAccountReducer,
    admin_motobike : adminMotobikeReducer,
    admin_store : adminStoreReducer,
    admin_booking : adminBookingReducer,
  },
});
