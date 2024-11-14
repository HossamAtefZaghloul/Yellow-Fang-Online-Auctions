import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userId: string | null;
  email: string;
  isAdmin: boolean;
}

const initialState: AuthState = {
  userId: null,
  email: '',
  isAdmin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ userId: string; email: string; isAdmin: boolean }>) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
    },
    clearUser: (state) => {
      state.userId = null;
      state.email = '';
      state.isAdmin = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
