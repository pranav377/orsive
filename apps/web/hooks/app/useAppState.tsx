import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const useAppState = () => {
    const appState = useSelector((state: RootState) => state.app);

    return appState;
};
