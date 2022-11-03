import { useStore } from "react-redux";
import { useAppState } from "../../hooks/app/useAppState";
import { AppStateActions } from "../../store/slices/appSlice";

export default function BionicMode() {
  const appState = useAppState();
  const store = useStore();

  return (
    <div className="flex items-center gap-1 my-2 bg-black p-3 rounded-full">
      <label
        className="flex items-center cursor-pointer select-none"
        onClick={async () => {
          localStorage.setItem("bionic_mode", `${!appState.bionicMode}`);
          store.dispatch(AppStateActions.toggleBionicMode());
        }}
      >
        👁️
        <div className="relative">
          <div
            className={`flex ${
              appState.bionicMode
                ? "bg-blue-600 justify-start"
                : "bg-gray-600 justify-end"
            } w-10 h-6 rounded-full`}
          ></div>
          <div
            className={`${
              appState.bionicMode ? "transform translate-x-full" : ""
            } absolute left-1 top-1  w-4 h-4 rounded-full transition bg-white`}
          ></div>
        </div>
        👁️
      </label>
    </div>
  );
}
