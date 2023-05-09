/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    mutation LoginAuthEmail($email: String!, $otp: String!) {\n        loginAuthEmail(email: $email, otp: $otp) {\n            token\n            user {\n                avatar\n                id\n                name\n                username\n            }\n        }\n    }\n": types.LoginAuthEmailDocument,
    "\n    mutation SendAuthOtp($email: String!) {\n        sendAuthOtp(email: $email) {\n            type\n        }\n    }\n": types.SendAuthOtpDocument,
    "\n    mutation SignupAuthEmail(\n        $email: String!\n        $username: String!\n        $name: String!\n        $otp: String!\n    ) {\n        signupAuthEmail(\n            email: $email\n            username: $username\n            name: $name\n            otp: $otp\n        ) {\n            token\n            user {\n                avatar\n                id\n                name\n                username\n            }\n        }\n    }\n": types.SignupAuthEmailDocument,
    "\n    query MeQuery {\n        me {\n            avatar\n            id\n            name\n            username\n        }\n    }\n": types.MeQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation LoginAuthEmail($email: String!, $otp: String!) {\n        loginAuthEmail(email: $email, otp: $otp) {\n            token\n            user {\n                avatar\n                id\n                name\n                username\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation LoginAuthEmail($email: String!, $otp: String!) {\n        loginAuthEmail(email: $email, otp: $otp) {\n            token\n            user {\n                avatar\n                id\n                name\n                username\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation SendAuthOtp($email: String!) {\n        sendAuthOtp(email: $email) {\n            type\n        }\n    }\n"): (typeof documents)["\n    mutation SendAuthOtp($email: String!) {\n        sendAuthOtp(email: $email) {\n            type\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation SignupAuthEmail(\n        $email: String!\n        $username: String!\n        $name: String!\n        $otp: String!\n    ) {\n        signupAuthEmail(\n            email: $email\n            username: $username\n            name: $name\n            otp: $otp\n        ) {\n            token\n            user {\n                avatar\n                id\n                name\n                username\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation SignupAuthEmail(\n        $email: String!\n        $username: String!\n        $name: String!\n        $otp: String!\n    ) {\n        signupAuthEmail(\n            email: $email\n            username: $username\n            name: $name\n            otp: $otp\n        ) {\n            token\n            user {\n                avatar\n                id\n                name\n                username\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query MeQuery {\n        me {\n            avatar\n            id\n            name\n            username\n        }\n    }\n"): (typeof documents)["\n    query MeQuery {\n        me {\n            avatar\n            id\n            name\n            username\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;