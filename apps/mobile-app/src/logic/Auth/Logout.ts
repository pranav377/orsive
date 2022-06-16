import { store } from "../../store";
import { AuthStateActions } from "../../store/slices/authSlice";

export async function Logout() {
  store.dispatch(AuthStateActions.logout());
}
