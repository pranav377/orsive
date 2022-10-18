import ActionType from "../../types";
import LIKE_CASES from "./cases";

export const initialLikeState: Array<{
  postId: string;
  type: "like" | "dislike" | "nope" | undefined;
  likes: number;
}> = [];

export default function like(state = initialLikeState, action: ActionType) {
  switch (action.type) {
    case LIKE_CASES.SET_LIKE:
      let newState = [
        ...state.filter((value) => value.postId !== action.payload.postId),
        { ...action.payload },
      ];

      return newState;

    case LIKE_CASES.RESET_LIKE:
      return initialLikeState;

    default:
      return state;
  }
}
