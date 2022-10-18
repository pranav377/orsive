export default function FileField(props: {
  errors: any;
  values: any;
  setFieldValue: any;
  name: string;
  label: string;
}) {
  return (
    <div>
      <label className="block mt-4 text-sm">{props.label}</label>

      <input
        name={props.name}
        type="file"
        className=" w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
        onChange={(event: any) => {
          props.setFieldValue(props.name, event.target.files[0]);
        }}
      />

      {props.errors[props.name] && (
        <p className="text-red-600 text-sm">{props.errors[props.name]}</p>
      )}
    </div>
  );
}
