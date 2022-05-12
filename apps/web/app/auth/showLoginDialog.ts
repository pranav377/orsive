import CONTENT_CASES from "../store/reducers/content/cases";
import store from "../store/store";

export function showLoginDialog() {
  store.dispatch({ type: CONTENT_CASES.SHOW_LOGIN_DIALOG });
}
