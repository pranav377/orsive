import { SIGN_IN_MUTATION_SCHEMA } from "../../../../../packages/common/mutations";
import { client } from "../client";
import LoginUser from "./LoginUser";

export default async function SignIn(data: {
  email: string;
  password: string;
}) {
  let result = await client.mutate({
    mutation: SIGN_IN_MUTATION_SCHEMA,
    variables: data,
  });

  await LoginUser(result.data.signIn.token, result.data.signIn);
}
