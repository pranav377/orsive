import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppStateActions } from '../../store/slices/appSlice';

export const useHideBars = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AppStateActions.setShowBars(false));

        return function () {
            dispatch(AppStateActions.setShowBars(true));
        };
    });
};
