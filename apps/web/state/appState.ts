import { create } from 'zustand';

interface AppState {
    bionicMode: boolean;
}

interface AppActions {
    setBionicMode: (status: boolean) => void;
}

const initialState: AppState = {
    bionicMode: false,
};

const useAppState = create<AppState & AppActions>()((set) => ({
    ...initialState,
    setBionicMode: (status) => {
        set((state) => ({ ...state, bionicMode: status }));
    },
}));

export default useAppState;
