import ActionType from "../../types";
import APP_CASES from "./cases";

export const initialAppState = {
  showBars: true,
  showReply: false,
  offline: false,
};

export default function app(state = initialAppState, action: ActionType) {
  switch (action.type) {
    case APP_CASES.SHOW_BARS:
      return { ...state, showBars: true };

    case APP_CASES.HIDE_BARS:
      return { ...state, showBars: false };

    case APP_CASES.SHOW_REPLY:
      return { ...state, showReply: true };

    case APP_CASES.HIDE_REPLY:
      return { ...state, showReply: false };

    case APP_CASES.SET_OFFLINE:
      return { ...state, offline: action.payload.offline };

    default:
      return state;
  }
}
