import Spinner from './Spinner';

export default function OneTimePageSpinner(props: {
    data: any;
    spinnerShown: boolean;
    long?: boolean;
}) {
    if (!props.data && !props.spinnerShown) {
        return (
            <div
                className={`m-2 flex items-center justify-center ${
                    props.long ? 'h-[70vh]' : ''
                }`}
            >
                <Spinner />
            </div>
        );
    } else {
        return null;
    }
}
