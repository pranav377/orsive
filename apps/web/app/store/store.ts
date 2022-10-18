import { createStore } from "redux";
import reducer from "./reducers";
import { initialUserState } from "./reducers/user";
import { initialAppState } from "./reducers/app";
import { initialContentState } from "./reducers/content";
import { initialLikeState } from "./reducers/like";
import { initialReportState } from "./reducers/report";

export const initialState = {
  user: initialUserState,
  app: initialAppState,
  content: initialContentState,
  like: initialLikeState,
  report: initialReportState,
};

const store = createStore(reducer);

export default store;
