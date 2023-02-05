import { setUser } from '../../components/app/AppMiddleware';
import { client } from '../../pages/_app';
import SIGN_UP_MUTATION_SCHEMA from './mutations/signUpMutate';

export default async function SignUp(data: {
    email: string;
    password: string;
    username: string;
    name: string;
    otp: string;
}) {
    let result = await client.mutate({
        mutation: SIGN_UP_MUTATION_SCHEMA,
        variables: data,
    });

    localStorage.setItem('token', result.data.signUp.token);

    setUser(result.data.signUp);
}
