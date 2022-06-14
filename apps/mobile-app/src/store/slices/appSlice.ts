import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  showLoadingScreen: boolean;
  loadingText: string;
}

const initialState: AppState = {
  showLoadingScreen: false,
  loadingText: "Loading...",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    showLoadingScreen: (
      state,
      action: PayloadAction<{ message: string } | undefined>
    ) => {
      state.showLoadingScreen = true;

      if (action.payload) {
        state.loadingText = action.payload.message;
      }
    },

    closeLoadingScreen: (state) => {
      state.loadingText = initialState.loadingText;
      state.showLoadingScreen = false;
    },
  },
});

export const AppStateActions = appSlice.actions;
export default appSlice.reducer;
