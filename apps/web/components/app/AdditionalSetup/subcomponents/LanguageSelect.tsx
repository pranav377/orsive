export default function LanguageSelect(props: { language: string }) {
  return (
    <>
      <label className=" bg-slate-800 w-full max-w-lg p-2 rounded-md cursor-pointer flex items-center">
        <span className="mr-2 select-none text-lg">{props.language}</span>
        <input
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
