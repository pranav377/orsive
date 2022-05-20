import ActionType from "../../types";
import USER_CASES from "./cases";

export const initialUserState = {
  is: false,
  username: "",
  avatar: "",
  unreadNotifications: false,
};

export default function user(
  state = initialUserState,
  action: ActionType
): typeof initialUserState {
  switch (action.type) {
    case USER_CASES.LOGIN:
      return {
        ...state,
        is: true,
        username: action.payload.username,
        avatar: action.payload.avatar,
      };

    case USER_CASES.LOGOUT:
      return initialUserState;

    case USER_CASES.NOTIFICATIONS_READ:
      return { ...state, unreadNotifications: false };

    case USER_CASES.SET_NOTIFICATIONS:
      return {
        ...state,
        unreadNotifications: action.payload.unreadNotifications,
      };

    default:
      return state;
  }
}
