import { useField } from 'formik';

export default function TextField(props: { name: string; label: string }) {
    const [field, meta] = useField(props);

    return (
        <>
            <label
                htmlFor={props.name}
                className="mb-2 mt-2 block text-sm font-medium text-gray-400"
            >
                {props.label}
            </label>
            <textarea
                {...field}
                name={props.name}
                placeholder={props.label}
                rows={4}
                className="block w-full rounded-lg border border-slate-600 bg-slate-800 p-2.5 text-sm placeholder-slate-400 "
            />
            {meta.touched && meta.error ? (
                <p className="text-sm text-red-600">{meta.error}</p>
            ) : null}
        </>
    );
}
