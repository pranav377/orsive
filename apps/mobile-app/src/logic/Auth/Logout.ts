import { store } from "../../store";
import { AuthStateActions } from "../../store/slices/authSlice";
import { client } from "../client";
import removeItem from "../SecureStore/removeItem";

export async function Logout() {
  await removeItem("token");
  client.resetStore();
  store.dispatch(AuthStateActions.logout());
}
