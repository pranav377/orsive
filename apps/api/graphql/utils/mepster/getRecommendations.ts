import { PAGINATION_SET_SIZE } from "../../config";
import recommenderClient from "./client";

export default async function getRecommendations(
  userId: string | undefined,
  offset = 0
) {
  let recommendUrl = userId
    ? `/recommend/${userId}/?n=${PAGINATION_SET_SIZE}&offset=${offset}`
    : `/latest/?n=${PAGINATION_SET_SIZE}&offset=${offset}`;

  let data = await (await recommenderClient.get(recommendUrl)).data;

  if (!data) {
    data = [];
  }

  if (data.length !== 0 && data[0].Id) {
    data = data.map((item: any) => item.Id);
  }

  return data;
}
