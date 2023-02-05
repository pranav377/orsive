import { store } from '../../store';
import { ContentStateActions } from '../../store/slices/contentSlice';

export function showLoginDialog() {
    store.dispatch(ContentStateActions.setShowLoginDialog(true));
}
