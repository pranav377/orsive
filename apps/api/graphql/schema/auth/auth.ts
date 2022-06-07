import { gql } from "apollo-server-express";

const AUTH_SCHEMA = gql`
  type UserCount {
    followers: Int
    following: Int
  }

  type User {
    id: ID
    username: String
    name: String
    avatar: String
    banner: String
    bio: String
    joined: Date
    _count: UserCount
  }

  type GetUserResponse {
    id: ID
    username: String
    name: String
    avatar: String
    banner: String
    bio: String
    joined: Date
    reputation: Int
    _count: UserCount
    roles: [String]
  }

  type MeResponse {
    id: ID
    username: String
    name: String
    avatar: String
    banner: String
    bio: String
    joined: Date
    _count: UserCount
    unreadNotifications: Boolean
    setupComplete: Boolean
    isStaff: Boolean
    isMod: Boolean
  }

  input SignUpInput {
    username: String!
    email: String!
    password: String!
    name: String!
    otp: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  input PasswordResetInput {
    otp: String!
    email: String!
    new_password: String!
  }

  type Query {
    getOTP(email: String!): String! @rateLimit(limit: 1, duration: 60)
    getPasswordResetOTP(email: String!): String!
      @rateLimit(limit: 1, duration: 60)
    getUser(username: String!): GetUserResponse!
    me: MeResponse!
    checkUsername(username: String!): String!
    checkEmail(email: String!): String!
  }

  type Mutation {
    signUp(input: SignUpInput!): MeResponse!
    signIn(input: SignInInput!): MeResponse!
    passwordReset(input: PasswordResetInput!): String!
    logout: String!
    followUser(username: String!): String!
    setupLanguages(langs: [String!]): String!
  }
`;

export default AUTH_SCHEMA;
