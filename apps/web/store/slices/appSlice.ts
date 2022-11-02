import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  showBars: boolean;
  showReply: boolean;
  bionicMode: boolean;
}

export const initialState: AppState = {
  showBars: true,
  showReply: false,
  bionicMode: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setShowBars: (state, action: PayloadAction<boolean>) => {
      state.showBars = action.payload;
    },
    setShowReply: (state, action: PayloadAction<boolean>) => {
      state.showReply = action.payload;
    },
    setBionicMode: (state, action: PayloadAction<boolean>) => {
      state.bionicMode = action.payload;
    },
    toggleBionicMode: (state) => {
      state.bionicMode = !state.bionicMode;
    },
  },
});

export const AppStateActions = appSlice.actions;
export default appSlice.reducer;
