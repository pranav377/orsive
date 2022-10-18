import localforage from "localforage";
import { useStore } from "react-redux";
import APP_CASES from "../../app/store/reducers/app/cases";
import { useAppState } from "../../hooks/app/useAppState";

export default function BionicMode() {
  const appState = useAppState();
  const store = useStore();

  return (
    <div className="flex items-center gap-1 my-3">
      <label
        className="flex items-center cursor-pointer"
        onClick={async () => {
          localforage.setItem("bionic_mode", !appState.bionicMode);
          store.dispatch({ type: APP_CASES.TOGGLE_BIONIC_MODE });
        }}
      >
        <div className="relative">
          <div
            className={`block ${
              appState.bionicMode ? "bg-blue-600" : "bg-gray-600"
            } w-10 h-6 rounded-full`}
          ></div>
          <div
            className={`${
              appState.bionicMode ? "transform translate-x-full" : ""
            } absolute left-1 top-1  w-4 h-4 rounded-full transition bg-white `}
          ></div>
        </div>
      </label>
      <span className="font-semibold">
        Bionic Mode (Increases Reading speed)
      </span>
    </div>
  );
}
