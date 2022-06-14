import { Text, TextInput } from "react-native-paper";
import { useBottomSheetInternal } from "@gorhom/bottom-sheet/src/hooks/useBottomSheetInternal";
import { forwardRef, memo, useCallback } from "react";

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

const BottomSheetTextFormInputComponent = forwardRef<
  typeof TextInput,
  {
    name: string;
    label: string;
    errors: { [key: string]: string };
    values: { [key: string]: string };
    handleChange: any;
    handleBlur: any;
    textInputProps?: React.ComponentProps<typeof TextInput>;
  }
>((props, ref) => {
  const { shouldHandleKeyboardEvents } = useBottomSheetInternal();

  const handleOnFocus = useCallback(
    (args) => {
      shouldHandleKeyboardEvents.value = true;
      if (props.textInputProps?.onFocus) {
        props.textInputProps.onFocus(args);
      }
    },
    [props.textInputProps?.onFocus, shouldHandleKeyboardEvents]
  );

  const handleOnBlur = useCallback(
    (args) => {
      shouldHandleKeyboardEvents.value = false;
      if (props.textInputProps?.onBlur) {
        props.textInputProps.onBlur(args);
      }
      props.handleBlur(props.name);
    },
    [props.textInputProps?.onBlur, shouldHandleKeyboardEvents, props.name]
  );

  return (
    <>
      <TextInput
        error={!!props.errors[props.name]}
        mode="outlined"
        style={{ width: "100%" }}
        label={props.label}
        onChangeText={props.handleChange(props.name)}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
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
});

const BottomSheetTextFormInput = memo(BottomSheetTextFormInputComponent);
BottomSheetTextFormInput.displayName = "BottomSheetTextFormInput";

export { BottomSheetTextFormInput };
