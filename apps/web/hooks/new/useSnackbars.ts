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

    return { handleLoginWelcome, displayLoginError };
};

export default useSnackbars;
