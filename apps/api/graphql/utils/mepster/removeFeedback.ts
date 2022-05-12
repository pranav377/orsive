import recommenderClient from "./client";

export default function removeFeedback(UserId: string, ItemId: string) {
  recommenderClient.delete(`/feedback/${UserId}/${ItemId}/`);
}
