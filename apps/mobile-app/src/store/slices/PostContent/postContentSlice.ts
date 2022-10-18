import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrsicSchema {
  content: string;
  title: string | null;
}

interface ImageSchema {
  image: {
    uri: string;
    name: string;
  };
  title: string | null;
  width: number;
  height: number;
}

export interface PostContentState {
  orsic: OrsicSchema;
  image: ImageSchema;
}

const initialState: PostContentState = {
  orsic: {
    content: "",
    title: null,
  },
  image: {
    image: {
      uri: "",
      name: "",
    },
    title: null,
    width: 0,
    height: 1,
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
    setImage: (
      state,
      action: PayloadAction<{
        image?: {
          uri: string;
          name: string;
        };
        title?: string | null;
        width?: number;
        height?: number;
      }>
    ) => {
      if (action.payload.image !== undefined) {
        state.image.image = action.payload.image;
      }
      if (action.payload.title !== undefined) {
        state.image.title = action.payload.title;
      }
      if (action.payload.width !== undefined) {
        state.image.width = action.payload.width;
      }
      if (action.payload.height !== undefined) {
        state.image.height = action.payload.height;
      }
    },
  },
});

export const PostContentActions = postcontentSlice.actions;
export default postcontentSlice.reducer;
