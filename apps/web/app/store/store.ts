import { createStore } from "redux";
import reducer from "./reducers";
import { initialUserState } from "./reducers/user";
import { initialAppState } from "./reducers/app";
import { initialContentState } from "./reducers/content";
import { initialFeaturesState } from "./reducers/features";
import { initialLikeState } from "./reducers/like";

export const initialState = {
  user: initialUserState,
  app: initialAppState,
  content: initialContentState,
  features: initialFeaturesState,
  like: initialLikeState,
};

const store = createStore(reducer);

export default store;
