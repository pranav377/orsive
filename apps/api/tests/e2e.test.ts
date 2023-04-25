// Make sure that the NODE_ENV is set to development and the API is running before the tests. Meant to be run in a docker environment.
// url -> ${NEXT_PUBLIC_API_URL}/graphql

import axios from 'axios';
import { print } from 'graphql';
import SIGN_UP_MUTATION_SCHEMA from '../../web/logic/auth/mutations/signUpMutate';
import userModel from '../models/user/UserModel';

const graphqlAPIEndpoint = `${process.env['NEXT_PUBLIC_API_URL']}/graphql`;

const userCreateQueryData = {
    query: print(SIGN_UP_MUTATION_SCHEMA),
    variables: {
        username: 'rick_astley',
        name: 'Rick Astley',
        email: 'rickastleysomething@gmail.com',
        password: 'test1234',
        otp: '1234',
    },
};

let authToken;

describe('e2e test', () => {
    it('create test user', async () => {
        const response = await axios.post(
            graphqlAPIEndpoint,
            userCreateQueryData
        );
        const data = response.data.data.signUp;

        expect(data).toHaveProperty('token');

        authToken = data.token;
    });
});
