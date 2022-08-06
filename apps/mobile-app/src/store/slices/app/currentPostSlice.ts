import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UploadedBy } from "../../../components/types";

export interface CurrentPostState {
  uploadedBy: UploadedBy;
  data: {
    slug: string;
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
  },
};

export const currentPostSlice = createSlice({
  name: "currentPost",
  initialState,
  reducers: {
    setPost: (
      state,
      action: PayloadAction<{ uploadedBy: UploadedBy; slug: string }>
    ) => {
      state.uploadedBy = action.payload.uploadedBy;
      state.data.slug = action.payload.slug;
    },
  },
});

export const CurrentPostActions = currentPostSlice.actions;
export default currentPostSlice.reducer;
