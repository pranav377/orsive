import { useSnackbar } from 'notistack';

const useSnackbars = () => {
    const { enqueueSnackbar } = useSnackbar();

    const displayLoginWelcome = (name: string) => {
        enqueueSnackbar(`Welcome ${name}`!);
    };

    return { displayLoginWelcome };
};

export default useSnackbars;
