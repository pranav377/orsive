import Spinner from "./Spinner";

export default function OneTimePageSpinner(props: {
  data: any;
  spinnerShown: boolean;
  long?: boolean;
}) {
  if (!props.data && !props.spinnerShown) {
    return (
      <div
        className={`flex items-center justify-center m-2 ${
          props.long && "h-[70vh]"
        }`}
      >
        <Spinner />
      </div>
    );
  }

  return null;
}
