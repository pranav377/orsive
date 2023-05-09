import { create } from 'zustand';

interface UserState {
    is: 'authenticated' | 'unauthenticated' | 'loading';
    id: string;
    username: string;
    avatar: string;
    name: string;
    setupComplete: boolean;
    bio?: string;
}

interface UserActions {
    login: (data: {
        id: string;
        username: string;
        avatar: string;
        name: string;
        setupComplete: boolean;
    }) => void;

    logout: () => void;

    makeSetupComplete: () => void;
}

const initialState: UserState = {
    is: 'loading',
    id: '',
    username: '',
    avatar: '',
    name: '',
    setupComplete: false,
};

const logoutState: UserState = {
    is: 'unauthenticated',
    id: '',
    username: '',
    avatar: '',
    name: '',
    setupComplete: false,
};

const useUserState = create<UserState & UserActions>()((set) => ({
    ...initialState,
    login: (data) => {
        set({
            is: 'authenticated',
            id: data.id,
            username: data.username,
            avatar: data.avatar,
            name: data.name,
            setupComplete: data.setupComplete,
        });
    },
    logout: () => {
        set(logoutState);
    },
    makeSetupComplete: () => {
        set((state) => ({ ...state, setupComplete: true }));
    },
}));

export default useUserState;
