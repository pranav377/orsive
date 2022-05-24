import { client } from "../../pages/_app";
import PASSWORD_RESET_MUTATION_SCHEMA from "./mutations/passwordResetMutate";

export default function PasswordReset(data: {
  otp: string;
  email: string;
  new_password: string;
}) {
  return client.mutate({
    mutation: PASSWORD_RESET_MUTATION_SCHEMA,
    variables: data,
  });
}
