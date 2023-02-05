import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ReportState = Array<{
    postId: string;
    voted: boolean;
}>;

export const initialState: ReportState = [];

export const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        setReport: (
            state,
            action: PayloadAction<{
                postId: string;
                voted: boolean;
            }>
        ) => {
            state = [
                ...state.filter(
                    (value) => value.postId !== action.payload.postId
                ),
                { ...action.payload },
            ];
        },

        resetReport: () => initialState,
    },
});

export const ReportStateActions = reportSlice.actions;
export default reportSlice.reducer;
