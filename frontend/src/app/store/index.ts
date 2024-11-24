import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import notificationSlice from './notificationSlice';
import auctionSlice from './auctionSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationSlice,
    auction: auctionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
