import { gql } from '@apollo/client';

const DELETE_USER_MUTATION_FOR_MOD = gql`
    mutation DeleteUserMutationForMod($username: String!) {
        deleteUser(username: $username)
    }
`;

export default DELETE_USER_MUTATION_FOR_MOD;
