import { SIGN_IN_MUTATION_SCHEMA } from "../../../../../packages/common/mutations";
import { store } from "../../store";
import { AuthStateActions } from "../../store/slices/authSlice";
import { client } from "../client";
import setItem from "../SecureStore/setItem";

export default async function SignIn(data: {
  email: string;
  password: string;
}) {
  let result = await client.mutate({
    mutation: SIGN_IN_MUTATION_SCHEMA,
    variables: data,
  });

  await setItem("token", result.data.signIn.token);
  store.dispatch(AuthStateActions.login(result.data.signIn));
}
