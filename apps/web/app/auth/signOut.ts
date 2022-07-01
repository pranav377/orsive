import localforage from "localforage";
import { client } from "../../pages/_app";
import LIKE_CASES from "../store/reducers/like/cases";
import USER_CASES from "../store/reducers/user/cases";
import store from "../store/store";
import LOGOUT_MUTATION_SCHEMA from "./mutations/logoutMutate";

export default async function signOut() {
  localforage.removeItem("username");
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
