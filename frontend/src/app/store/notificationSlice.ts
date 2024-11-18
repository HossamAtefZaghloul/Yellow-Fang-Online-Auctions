import { createSlice } from "@reduxjs/toolkit";

interface NotificationState {
  message: string | null;
  visible: boolean;
}

const initialState: NotificationState = {
  message: null,
  visible: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload;
      state.visible = true;
    },
    hideNotification: (state) => {
      state.message = null;
      state.visible = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
