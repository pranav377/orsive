import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INFINITE_SCROLL_SCREENS } from '../../config';

export interface AppState {
    showBars: boolean;
    showReply: boolean;
    bionicMode: boolean;
    scrollRestoring: {
        feed: number | undefined;
        profile: number | undefined;
        search: number | undefined;
        following: number | undefined;
        moderation: number | undefined;
    };
}

export const initialState: AppState = {
    showBars: true,
    showReply: false,
    bionicMode: false,
    scrollRestoring: {
        feed: undefined,
        profile: undefined,
        search: undefined,
        following: undefined,
        moderation: undefined,
    },
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setShowBars: (state, action: PayloadAction<boolean>) => {
            state.showBars = action.payload;
        },
        setShowReply: (state, action: PayloadAction<boolean>) => {
            state.showReply = action.payload;
        },
        setBionicMode: (state, action: PayloadAction<boolean>) => {
            state.bionicMode = action.payload;
        },
        toggleBionicMode: (state) => {
            state.bionicMode = !state.bionicMode;
        },
        setScrollRestoring: (
            state,
            action: PayloadAction<{
                screen: INFINITE_SCROLL_SCREENS;
                objIdx: number;
            }>
        ) => {
            state.scrollRestoring[action.payload.screen] =
                action.payload.objIdx;
        },
    },
});

export const AppStateActions = appSlice.actions;
export default appSlice.reducer;
