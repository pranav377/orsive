import ActionType from "../../types";
import CONTENT_CASES from "./cases";

export const initialContentState = {
  postOrsic: false,
  postImage: false,
  postContent: false,
  editProfile: false,
  loginDialog: false,
};

export default function content(
  state = initialContentState,
  action: ActionType
) {
  switch (action.type) {
    case CONTENT_CASES.SHOW_POST_CONTENT:
      return { ...state, postContent: true };

    case CONTENT_CASES.HIDE_POST_CONTENT:
      return { ...state, postContent: false };

    case CONTENT_CASES.SHOW_POST_ORSIC:
      return { ...state, postOrsic: true };

    case CONTENT_CASES.HIDE_POST_ORSIC:
      return { ...state, postOrsic: false };

    case CONTENT_CASES.SHOW_POST_IMAGE:
      return { ...state, postImage: true };

    case CONTENT_CASES.HIDE_POST_IMAGE:
      return { ...state, postImage: false };

    case CONTENT_CASES.SHOW_EDIT_PROFILE:
      return { ...state, editProfile: true };

    case CONTENT_CASES.HIDE_EDIT_PROFILE:
      return { ...state, editProfile: false };

    case CONTENT_CASES.SHOW_LOGIN_DIALOG:
      return { ...state, loginDialog: true };

    case CONTENT_CASES.HIDE_LOGIN_DIALOG:
      return { ...state, loginDialog: false };

    default:
      return state;
  }
}
