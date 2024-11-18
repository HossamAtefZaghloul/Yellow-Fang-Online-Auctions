import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userId: string | null;
  email: string | null;
  isAdmin: string;
}

const initialState: UserState = (() => {
  const savedUser = localStorage.getItem("authData");
  return savedUser ? JSON.parse(savedUser) : { userId: null, email: null, isAdmin: false };
})();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;

      // Save user data to localStorage
      localStorage.setItem("authData", JSON.stringify(state));
    },
    logout: (state) => {
      // Clear the state and localStorage on logout
      state.userId = null;
      state.email = null;
      state.isAdmin = "user";

      localStorage.removeItem("authData");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
