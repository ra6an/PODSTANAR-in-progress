import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth-slice";
import articleSlice from "./reducers/article-slice";
import bookingSlice from "./reducers/booking-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    article: articleSlice.reducer,
    booking: bookingSlice.reducer,
  },
});

export const authActions = authSlice.actions;
export const articleActions = articleSlice.actions;
export const bookingActions = bookingSlice.actions;

export default store;
