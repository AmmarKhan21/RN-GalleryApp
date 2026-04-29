import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, RegisteredUser } from '../../../types';

const initialState: AuthState = {
  user: null,
  isRegistered: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser(state, action: PayloadAction<RegisteredUser>) {
      state.user = action.payload;
      state.isRegistered = true;
    },
    clearAuth(state) {
      state.user = null;
      state.isRegistered = false;
    },
  },
});

export const { registerUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
