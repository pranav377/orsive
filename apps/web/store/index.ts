import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";
import contentSlice from "./slices/contentSlice";
import likeSlice from "./slices/likeSlice";
import reportSlice from "./slices/reportSlice";
import userSlice from "./slices/userSlice";

const reducers = combineReducers({
  user: userSlice,
  app: appSlice,
  content: contentSlice,
  like: likeSlice,
  report: reportSlice,
});

export const store = configureStore({
  reducer: reducers,
});
export type RootState = ReturnType<typeof store.getState>;
