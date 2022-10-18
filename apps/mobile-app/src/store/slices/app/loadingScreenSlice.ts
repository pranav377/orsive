import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoadingScreenState {
  showLoadingScreen: boolean;
  loadingText: string;
}

const initialState: LoadingScreenState = {
  showLoadingScreen: false,
  loadingText: "Loading...",
};

export const loadingScreenSlice = createSlice({
  name: "loadingScreen",
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

export const LoadingScreenActions = loadingScreenSlice.actions;
export default loadingScreenSlice.reducer;
