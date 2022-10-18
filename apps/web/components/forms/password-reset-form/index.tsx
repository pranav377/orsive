import { useState } from "react";
import PasswordResetStep1 from "./passwordResetStep1";
import PasswordResetStep2 from "./passwordResetStep2";

export default function PasswordResetForm(props: { setCurrPage: any }) {
  const [passwordResetFormState, setPasswordResetFormState] = useState({
    step: 1,
    otp: "",
    email: "",
    new_password: "",
  });

  switch (passwordResetFormState.step) {
    case 1:
      return (
        <PasswordResetStep1
          setPasswordResetFormState={setPasswordResetFormState}
        />
      );
    case 2:
      return (
        <PasswordResetStep2
          passwordResetFormState={passwordResetFormState}
          setPasswordResetFormState={setPasswordResetFormState}
          setCurrPage={props.setCurrPage}
        />
      );
    default:
      return (
        <PasswordResetStep1
          setPasswordResetFormState={setPasswordResetFormState}
        />
      );
  }
}
