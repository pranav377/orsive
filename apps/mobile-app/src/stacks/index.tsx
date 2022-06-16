import { useUser } from "../hooks/Auth/useUser";
import SignedInStack from "./SignedInStack";
import SignedOutStack from "./SignedOutStack";

export default function GlobalStackIndex() {
  const user = useUser();

  if (user.is) {
    return <SignedInStack />;
  } else {
    return <SignedOutStack />;
  }
}
