import { create } from 'zustand';

interface UserState {
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

interface UserActions {
    login: (data: {
        username: string;
        avatar: string;
        name: string;
        setupComplete: boolean;
        isMod: boolean;
        isStaff: boolean;
    }) => void;

    logout: () => void;

    notificationsRead: () => void;

    setNotification: (status: boolean) => void;

    makeSetupComplete: () => void;
}

const initialState: UserState = {
    is: false,
    username: '',
    avatar: '',
    name: '',
    unreadNotifications: false,
    setupComplete: true,
    isMod: false,
    isStaff: false,
};

const useUserState = create<UserState & UserActions>()((set) => ({
    ...initialState,
    login: (data) => {
        set({
            is: true,
            username: data.username,
            avatar: data.avatar,
            name: data.name,
            setupComplete: data.setupComplete,
            isMod: data.isMod,
            isStaff: data.isStaff,
        });
    },
    logout: () => {
        set(initialState);
    },

    notificationsRead: () => {
        set({ unreadNotifications: false });
    },

    setNotification: (status) => {
        set({ unreadNotifications: status });
    },

    makeSetupComplete: () => {
        set({ setupComplete: true });
    },
}));

export default useUserState;
