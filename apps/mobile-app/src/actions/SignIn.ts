import { client } from "../App";
import { SIGN_IN_MUTATION_SCHEMA } from "../../../../packages/common/mutations";

export default async function SignIn(data: {
  email: string;
  password: string;
}) {
  let result = await client.mutate({
    mutation: SIGN_IN_MUTATION_SCHEMA,
    variables: data,
  });
}
