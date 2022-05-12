import { useField } from "formik";

export default function TextField(props: { name: string; label: string }) {
  const [field, meta] = useField(props);

  return (
    <>
      <label
        htmlFor={props.name}
        className="block mb-2 mt-2 text-sm font-medium text-gray-400"
      >
        {props.label}
      </label>
      <textarea
        {...field}
        name={props.name}
        placeholder={props.label}
        rows={4}
        className="block p-2.5 w-full text-sm rounded-lg border bg-slate-800 border-slate-600 placeholder-slate-400 "
      />
      {meta.touched && meta.error ? (
        <p className="text-red-600 text-sm">{meta.error}</p>
      ) : null}
    </>
  );
}
