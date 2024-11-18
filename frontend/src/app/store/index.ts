import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import notificationSlice from './notificationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
