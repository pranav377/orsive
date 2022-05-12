import { useState } from "react";
import SignUpStep1 from "./signUpStep1";
import SignUpStep2 from "./signUpStep2";

export default function SignUpForm() {
  const [signUpFormState, setSignUpFormState] = useState({
    step: 1,
    email: "",
    password: "",
    confirm_password: "",
    username: "",
    name: "",
    otp: "",
  });

  switch (signUpFormState.step) {
    case 1:
      return <SignUpStep1 setSignUpFormState={setSignUpFormState} />;
    case 2:
      return (
        <SignUpStep2
          signUpFormState={signUpFormState}
          setSignUpFormState={setSignUpFormState}
        />
      );
    default:
      return <SignUpStep1 setSignUpFormState={setSignUpFormState} />;
  }
}
