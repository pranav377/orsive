import { Text, TextInput } from "react-native-paper";

export default function TextFormInput(props: {
  name: string;
  label: string;
  errors: { [key: string]: string };
  values: { [key: string]: string };
  handleChange: any;
  handleBlur: any;
  textInputProps?: React.ComponentProps<typeof TextInput>;
}) {
  return (
    <>
      <TextInput
        error={!!props.errors[props.name]}
        mode="outlined"
        style={{ width: "100%" }}
        label={props.label}
        onChangeText={props.handleChange(props.name)}
        onBlur={props.handleBlur(props.name)}
        value={props.values[props.name]}
        {...props.textInputProps}
      />

      {props.errors[props.name] && (
        <>
          <Text style={{ color: "red", textAlign: "left" }}>
            {props.errors[props.name]}
          </Text>
        </>
      )}
    </>
  );
}
