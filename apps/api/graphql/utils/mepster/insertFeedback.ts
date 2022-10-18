import recommenderClient from "./client";
import moment from "moment";

export default function insertFeedback(
  UserId: string,
  ItemId: string,
  feedback: "like" | "view",
  didUserDislike?: boolean
) {
  let Timestamp;

  if (feedback === "view" && didUserDislike) {
    Timestamp = new Date().toISOString();
    return recommenderClient.put("feedback/", [
      {
        UserId,
        ItemId,
        Timestamp,
        FeedbackType: feedback,
      },
    ]);
  } else if (feedback === "view") {
    Timestamp = moment(new Date()).add(1, "M").toISOString();
  } else {
    Timestamp = moment(new Date()).add(1, "week").toISOString();
  }

  return recommenderClient.post("feedback/", [
    {
      UserId,
      ItemId,
      Timestamp,
      FeedbackType: feedback,
    },
  ]);
}
