import useAppState from '@/state/appState';

const useAnimate = () => {
    const viewTransitionsEnabled = useAppState(
        (state) => state.viewTransitions
    );

    const animate = (callback: () => void) => {
        if (!viewTransitionsEnabled) {
            callback();
        } else {
            // @ts-ignore
            return document.startViewTransition(() => {
                callback();
            });
        }
    };

    return { animate };
};

export default useAnimate;
