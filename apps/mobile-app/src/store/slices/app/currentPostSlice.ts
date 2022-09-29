import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UploadedBy } from "../../../components/types";

export interface CurrentPostState {
  uploadedBy: UploadedBy;
  data: {
    slug: string;
    postId: string;
  };
}

const initialState: CurrentPostState = {
  uploadedBy: {
    avatar: "",
    bio: "",
    name: "",
    username: "",
  },
  data: {
    slug: "",
    postId: "",
  },
};

export const currentPostSlice = createSlice({
  name: "currentPost",
  initialState,
  reducers: {
    setPost: (
      state,
      action: PayloadAction<{
        uploadedBy: UploadedBy;
        slug: string;
        postId: string;
      }>
    ) => {
      state.uploadedBy = action.payload.uploadedBy;
      state.data.slug = action.payload.slug;
      state.data.postId = action.payload.postId;
    },
  },
});

export const CurrentPostActions = currentPostSlice.actions;
export default currentPostSlice.reducer;
