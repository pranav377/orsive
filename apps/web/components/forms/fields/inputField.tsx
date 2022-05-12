import { Field, ErrorMessage } from "formik";

export default function InputField(props: {
  type: string;
  name: string;
  label: string;
  validate?: any;
}) {
  return (
    <div>
      <label className="block mt-4 text-sm">{props.label}</label>
      <Field
        validate={props.validate}
        type={props.type}
        name={props.name}
        placeholder={props.label}
        className="bg-slate-800 placeholder-gray-400 w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
      />
      <ErrorMessage
        className="text-red-600 text-sm"
        name={props.name}
        component="div"
      />
    </div>
  );
}
