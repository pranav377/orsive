import { create } from 'zustand';

interface UserState {
    is: 'authenticated' | 'unauthenticated' | 'loading';
    id: string;
    username: string;
    avatar: string;
    name: string;
    bio?: string;
}

interface UserActions {
    login: (data: {
        id: string;
        username: string;
        avatar: string;
        name: string;
    }) => void;

    logout: () => void;
}

const initialState: UserState = {
    is: 'loading',
    id: '',
    username: '',
    avatar: '',
    name: '',
};

const logoutState: UserState = {
    is: 'unauthenticated',
    id: '',
    username: '',
    avatar: '',
    name: '',
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
        });
    },
    logout: () => {
        set(logoutState);
    },
}));

export default useUserState;
