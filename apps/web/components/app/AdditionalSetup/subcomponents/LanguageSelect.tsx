import { useContext } from "react";
import { ADDITIONAL_SETUP_CONTEXT } from "..";

export default function LanguageSelect(props: { language: string }) {
  const { setSelectedLanguages, selectionStore, setSelectionStore } =
    useContext(ADDITIONAL_SETUP_CONTEXT);
  return (
    <>
      <label className=" bg-slate-800 w-full max-w-lg p-2 rounded-md cursor-pointer flex items-center">
        <span className="mr-2 select-none text-lg">{props.language}</span>
        <input
          checked={
            !!selectionStore.filter((obj) => obj.name === props.language)[0]?.on
          }
          onChange={() => {
            const newState = !selectionStore.filter(
              (obj) => obj.name === props.language
            )[0]?.on;

            if (newState) {
              setSelectedLanguages((prevLanguages) => [
                ...prevLanguages.filter((lang) => lang !== props.language),
                props.language,
              ]);
            } else {
              setSelectedLanguages((prevLanguages) =>
                prevLanguages.filter((lang) => lang !== props.language)
              );
            }

            setSelectionStore((prevObjs) => [
              ...prevObjs.filter((prevObj) => prevObj.name !== props.language),
              { name: props.language, on: newState },
            ]);
          }}
          type="checkbox"
          style={{
            boxShadow: "none",
          }}
          className="w-4 h-4 rounded-full bg-gray-200 text-blue-600 border-none focus:ring-0 ml-auto"
        />
      </label>
    </>
  );
}
