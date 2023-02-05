import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    is: boolean;
    username: string;
    avatar: string;
    name: string;
    unreadNotifications: boolean;
    setupComplete: boolean;
    isMod: boolean;
    isStaff: boolean;
    bio?: string;
}

export const initialState: UserState = {
    is: false,
    username: '',
    avatar: '',
    name: '',
    unreadNotifications: false,
    setupComplete: true,
    isMod: false,
    isStaff: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (
            state,
            action: PayloadAction<{
                username: string;
                avatar: string;
                name: string;
                setupComplete: boolean;
                isMod: boolean;
                isStaff: boolean;
            }>
        ) => {
            state.username = action.payload.username;
            state.avatar = action.payload.avatar;
            state.name = action.payload.name;
            state.setupComplete = action.payload.setupComplete;
            state.isMod = action.payload.isMod;
            state.isStaff = action.payload.isStaff;
            state.is = true;
        },

        logout: () => initialState,

        notificationsRead: (state) => {
            state.unreadNotifications = false;
        },

        setNotification: (state, action: PayloadAction<boolean>) => {
            state.unreadNotifications = action.payload;
        },

        setupComplete: (state) => {
            state.setupComplete = true;
        },
    },
});

export const UserStateActions = userSlice.actions;
export default userSlice.reducer;
