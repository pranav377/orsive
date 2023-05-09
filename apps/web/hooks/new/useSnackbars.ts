import { useSnackbar } from 'notistack';

const useSnackbars = () => {
    const { enqueueSnackbar } = useSnackbar();

    const handleLoginWelcome = (name: string) => {
        enqueueSnackbar(`Welcome ${name}!`);
    };

    const displayLoginError = (error: string) => {
        enqueueSnackbar(error, {
            variant: 'error',
        });
    };

    const displaySetupComplete = () => {
        enqueueSnackbar(`Setup preferred languages`);
    };

    const displaySetupCompleteError = () => {
        enqueueSnackbar('Something went wrong. Try again', {
            variant: 'error',
        });
    };

    return {
        handleLoginWelcome,
        displayLoginError,
        displaySetupComplete,
        displaySetupCompleteError,
    };
};

export default useSnackbars;
