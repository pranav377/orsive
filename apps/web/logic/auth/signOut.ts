import localforage from 'localforage';
import { client } from '../../pages/_app';
import { store } from '../../store';
import { LikeStateActions } from '../../store/slices/likeSlice';
import { UserStateActions } from '../../store/slices/userSlice';

export default async function signOut() {
    localforage.removeItem('username');
    localStorage.removeItem('token');
    store.dispatch(UserStateActions.logout());
    store.dispatch(LikeStateActions.resetLike());
    client.resetStore();
}
