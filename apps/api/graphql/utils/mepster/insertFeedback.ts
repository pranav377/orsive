import recommenderClient from "./client";
import moment from "moment";

export default function insertFeedback(
  UserId: string,
  ItemId: string,
  feedback: "like" | "view"
) {
  return recommenderClient.post("feedback/", [
    {
      UserId,
      ItemId,
      Timestamp:
        feedback === "view"
          ? moment(new Date()).add(1, "M").toISOString()
          : moment(new Date()).add(1, "week").toISOString(),
      FeedbackType: feedback,
    },
  ]);
}
