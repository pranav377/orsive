import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  is: boolean;
  username: string;
  avatar: string;
  name: string;
  unreadNotifications: boolean;
  setupComplete: boolean;
}

const initialState: AuthState = {
  is: false,
  username: "",
  avatar: "",
  name: "",
  unreadNotifications: false,
  setupComplete: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        username: string;
        avatar: string;
        name: string;
        setupComplete: boolean;
      }>
    ) => {
      state.username = action.payload.username;
      state.avatar = action.payload.avatar;
      state.name = action.payload.name;
      state.setupComplete = action.payload.setupComplete;
    },

    logout: (state) => {
      state = initialState;
    },

    notificationsRead: (state) => {
      state.unreadNotifications = false;
    },

    setNotification: (state, action: PayloadAction<boolean>) => {
      state.unreadNotifications = action.payload;
    },

    setupComplete: (state) => {
      state.setupComplete = true;
    },
  },
});

export const AuthStateActions = authSlice.actions;
export default authSlice.reducer;
