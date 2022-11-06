import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LikeState = Array<{
  postId: string;
  type: "like" | "dislike" | "nope" | undefined;
  likes: number;
}>;

export const initialState: LikeState = [];

export const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    setLike: (
      state,
      action: PayloadAction<{
        postId: string;
        type: "like" | "dislike" | "nope";
        likes: number;
      }>
    ) => [
      ...state.filter((value) => value.postId !== action.payload.postId),
      { ...action.payload },
    ],
    resetLike: () => initialState,
  },
});

export const LikeStateActions = likeSlice.actions;
export default likeSlice.reducer;
