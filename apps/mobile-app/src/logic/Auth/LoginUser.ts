import { store } from "../../store";
import { AuthStateActions } from "../../store/slices/authSlice";
import setItem from "../SecureStore/setItem";

export default async function LoginUser(
  token: string,
  data: {
    username: string;
    avatar: string;
    name: string;
    setupComplete: boolean;
  }
) {
  await setItem("token", token);
  store.dispatch(AuthStateActions.login(data));
}
