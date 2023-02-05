import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ContentState {
    postOrsic: boolean;
    postImage: boolean;
    postContent: boolean;
    editProfile: boolean;
    loginDialog: boolean;
}

export const initialState: ContentState = {
    postOrsic: false,
    postImage: false,
    postContent: false,
    editProfile: false,
    loginDialog: false,
};

export const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        setShowPostContent: (state, action: PayloadAction<boolean>) => {
            state.postContent = action.payload;
        },
        setShowPostOrsic: (state, action: PayloadAction<boolean>) => {
            state.postOrsic = action.payload;
        },
        setShowPostImage: (state, action: PayloadAction<boolean>) => {
            state.postImage = action.payload;
        },
        setShowEditProfile: (state, action: PayloadAction<boolean>) => {
            state.editProfile = action.payload;
        },
        setShowLoginDialog: (state, action: PayloadAction<boolean>) => {
            state.loginDialog = action.payload;
        },
    },
});

export const ContentStateActions = contentSlice.actions;
export default contentSlice.reducer;
