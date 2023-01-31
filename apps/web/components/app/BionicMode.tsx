import toast from 'react-hot-toast';
import { useStore } from 'react-redux';
import { useAppState } from '../../hooks/app/useAppState';
import { AppStateActions } from '../../store/slices/appSlice';

export default function BionicMode() {
    const appState = useAppState();
    const store = useStore();

    return (
        <div className="my-2 flex items-center gap-1 rounded-full bg-black p-3">
            <label
                className="flex cursor-pointer select-none items-center"
                onClick={async () => {
                    localStorage.setItem(
                        'bionic_mode',
                        `${!appState.bionicMode}`
                    );
                    toast.success(
                        `Bionic mode is ${!appState.bionicMode ? 'On' : 'Off'}`
                    );
                    store.dispatch(AppStateActions.toggleBionicMode());
                }}
            >
                👁️
                <div className="relative">
                    <div
                        className={`flex ${
                            appState.bionicMode
                                ? 'justify-start bg-blue-600'
                                : 'justify-end bg-gray-600'
                        } h-6 w-10 rounded-full`}
                    ></div>
                    <div
                        className={`${
                            appState.bionicMode
                                ? 'translate-x-full transform'
                                : ''
                        } absolute left-1 top-1  h-4 w-4 rounded-full bg-white transition`}
                    ></div>
                </div>
                👁️
            </label>
        </div>
    );
}
