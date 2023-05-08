import { useSnackbar } from 'notistack';

const useSnackbars = () => {
    const { enqueueSnackbar } = useSnackbar();

    const displayLoginWelcome = (name: string) => {
        enqueueSnackbar(`Welcome ${name}!`);
    };

    const displayLoginError = (error: string) => {
        enqueueSnackbar(error, {
            variant: 'error',
        });
    };

    return { displayLoginWelcome, displayLoginError };
};

export default useSnackbars;
