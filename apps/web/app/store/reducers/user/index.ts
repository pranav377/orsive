import ActionType from "../../types";
import USER_CASES from "./cases";

export const initialUserState = {
  is: false,
  username: "",
  avatar: "",
  unreadNotifications: false,
};

export default function user(state = initialUserState, action: ActionType) {
  switch (action.type) {
    case USER_CASES.LOGIN:
      return {
        is: true,
        username: action.payload.username,
        avatar: action.payload.avatar,
        unreadNotifications: action.payload.unreadNotifications,
      };

    case USER_CASES.LOGOUT:
      return initialUserState;

    case USER_CASES.NOTIFICATIONS_READ:
      return { ...state, unreadNotifications: false };

    default:
      return state;
  }
}
