import { create } from 'zustand';

interface AppState {
    bionicMode: boolean;
    viewTransitions: boolean;
}

interface AppActions {
    setBionicMode: (status: boolean) => void;
    setViewTransitions: (status: boolean) => void;
}

const initialState: AppState = {
    bionicMode: false,
    viewTransitions: false,
};

const useAppState = create<AppState & AppActions>()((set) => ({
    ...initialState,
    setBionicMode: (status) => {
        set((state) => ({ ...state, bionicMode: status }));
    },
    setViewTransitions: (status) => {
        set((state) => ({ ...state, viewTransitions: status }));
    },
}));

export default useAppState;
