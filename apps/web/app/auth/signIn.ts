import { setUser } from "../../components/app/AppMiddleware";
import { client } from "../../pages/_app";
import SIGN_IN_MUTATION_SCHEMA from "./mutations/signInMutate";

export default async function SignIn(data: {
  email: string;
  password: string;
}) {
  let result = await client.mutate({
    mutation: SIGN_IN_MUTATION_SCHEMA,
    variables: data,
  });

  setUser(result.data.signIn);
}
