import ActionType from "../../types";
import REPORT_CASES from "./cases";

export const initialReportState: Array<{
  postId: string;
  voted: boolean;
}> = [];

export default function report(state = initialReportState, action: ActionType) {
  switch (action.type) {
    case REPORT_CASES.SET_REPORT:
      let newState = [
        ...state.filter((value) => value.postId !== action.payload.postId),
        { ...action.payload },
      ];

      return newState;

    case REPORT_CASES.RESET_REPORT:
      return initialReportState;

    default:
      return state;
  }
}
