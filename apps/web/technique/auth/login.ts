import useUserState from '@/state/userState';

interface LoginPayload {
    user: {
        id: string;
        username: string;
        avatar: string;
        name: string;
        setupComplete: boolean;
    };
    token: string;
}

export default function login(payload: LoginPayload) {
    const { user, token } = payload;

    localStorage.setItem('token', token);

    useUserState.getState().login(user);
}
