import { combineReducers } from "redux";
import user from "./user";
import content from "./content";
import app from "./app";
import like from "./like";
import report from "./report";

export default combineReducers({
  user,
  content,
  app,
  like,
  report,
});
