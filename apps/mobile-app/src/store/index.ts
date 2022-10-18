import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import loadingScreenReducer from "./slices/app/loadingScreenSlice";
import currentPostReducer from "./slices/app/currentPostSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import postContentSlice from "./slices/PostContent/postContentSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["loadingScreen", "currentPost", "postContent"],
};

const reducers = persistReducer(
  persistConfig,
  combineReducers({
    auth: authReducer,
    loadingScreen: loadingScreenReducer,
    currentPost: currentPostReducer,
    postContent: postContentSlice,
  })
);

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
