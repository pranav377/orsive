import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrsicSchema {
  content: string;
  title: string | null;
}

export interface PostContentState {
  orsic: OrsicSchema;
}

const initialState: PostContentState = {
  orsic: {
    content: "",
    title: null,
  },
};

export const postcontentSlice = createSlice({
  name: "postContent",
  initialState,
  reducers: {
    setOrsic: (
      state,
      action: PayloadAction<{ content?: string; title?: string | null }>
    ) => {
      if (action.payload.content !== undefined) {
        state.orsic.content = action.payload.content;
      }
      if (action.payload.title !== undefined) {
        state.orsic.title = action.payload.title;
      }
    },
  },
});

export const PostContentActions = postcontentSlice.actions;
export default postcontentSlice.reducer;
