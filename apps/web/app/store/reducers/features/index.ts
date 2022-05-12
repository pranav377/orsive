import ActionType from "../../types";
import FEATURES_CASES from "./cases";

export const initialFeaturesState: Array<{
  name: string;
  status: "enabled" | "disabled" | "comingsoon";
}> = [
  {
    name: "auth",
    status: "enabled",
  },
  {
    name: "post-image",
    status: "enabled",
  },
  {
    name: "post-orsic",
    status: "enabled",
  },
  {
    name: "post-comment",
    status: "enabled",
  },
  {
    name: "post-like",
    status: "enabled",
  },
  {
    name: "delete-post",
    status: "enabled",
  },
  {
    name: "edit-profile",
    status: "enabled",
  },
];

export default function features(
  state = initialFeaturesState,
  action: ActionType
) {
  switch (action.type) {
    case FEATURES_CASES.GET_FEATURES:
      return state;

    case FEATURES_CASES.SET_FEATURES:
      return action.payload;

    default:
      return state;
  }
}
