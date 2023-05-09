import useUserState from '@/state/userState';

export default function logout() {
    localStorage.removeItem('token');

    useUserState.getState().logout();
}
