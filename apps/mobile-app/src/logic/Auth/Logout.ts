import { store } from "../../store";
import { AuthStateActions } from "../../store/slices/authSlice";
import removeItem from "../SecureStore/removeItem";

export async function Logout() {
  await removeItem("token");
  store.dispatch(AuthStateActions.logout());
}
