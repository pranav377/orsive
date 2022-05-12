import { combineReducers } from "redux";
import user from "./user";
import content from "./content";
import app from "./app";
import features from "./features";
import like from "./like";

export default combineReducers({
  user,
  content,
  app,
  features,
  like,
});
