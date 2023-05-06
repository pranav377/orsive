import { create } from 'zustand';

interface UserState {
    is: boolean;
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
    is: false,
    id: '',
    username: '',
    avatar: '',
    name: '',
};

const useUserState = create<UserState & UserActions>()((set) => ({
    ...initialState,
    login: (data) => {
        set({
            is: true,
            id: data.id,
            username: data.username,
            avatar: data.avatar,
            name: data.name,
        });
    },
    logout: () => {
        set(initialState);
    },
}));

export default useUserState;
