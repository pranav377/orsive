import { removeCookies } from "cookies-next";
import { USER_COOKIE_KEY } from "../../config";
import { client } from "../../pages/_app";
import LIKE_CASES from "../store/reducers/like/cases";
import USER_CASES from "../store/reducers/user/cases";
import store from "../store/store";
import LOGOUT_MUTATION_SCHEMA from "./mutations/logoutMutate";

export default async function signOut() {
  removeCookies(USER_COOKIE_KEY);
  await client.mutate({
    mutation: LOGOUT_MUTATION_SCHEMA,
  });
  store.dispatch({
    type: USER_CASES.LOGOUT,
  });
  store.dispatch({
    type: LIKE_CASES.RESET_LIKE,
  });
  client.resetStore();
}
