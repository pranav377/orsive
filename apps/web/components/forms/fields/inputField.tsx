import { Field, ErrorMessage } from 'formik';

export default function InputField(props: {
    type: string;
    name: string;
    label: string;
    validate?: any;
}) {
    return (
        <div>
            <label className="mt-4 block text-sm">{props.label}</label>
            <Field
                validate={props.validate}
                type={props.type}
                name={props.name}
                placeholder={props.label}
                className="w-full rounded-md border bg-slate-800 px-4 py-2 text-sm placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <ErrorMessage
                className="text-sm text-red-600"
                name={props.name}
                component="div"
            />
        </div>
    );
}
