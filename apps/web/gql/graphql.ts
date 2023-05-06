/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a date and time in the UTC
   * timezone. The DateTime appears in a JSON response as an ISO8601 formatted
   * string, including UTC timezone ("Z"). The parsed date and time string will
   * be converted to UTC if there is an offset.
   */
  DateTime: any;
};

export type ChannelMetadata = {
  __typename?: 'ChannelMetadata';
  avatar?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  isPinned?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  unreadCount?: Maybe<Scalars['Int']>;
  whoIsTyping?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ChannelType = {
  __typename?: 'ChannelType';
  id?: Maybe<Scalars['ID']>;
  lastMessage?: Maybe<ChatMessage>;
  metadata?: Maybe<ChannelMetadata>;
  type?: Maybe<Scalars['String']>;
  yourId?: Maybe<Scalars['ID']>;
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  user?: Maybe<ChatUser>;
};

export type ChatUser = {
  __typename?: 'ChatUser';
  avatar?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type CheckUsernameResponse = {
  __typename?: 'CheckUsernameResponse';
  available?: Maybe<Scalars['Boolean']>;
};

export type HelloType = {
  __typename?: 'HelloType';
  hello?: Maybe<Scalars['String']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<ChatUser>;
};

export type OtpResponse = {
  __typename?: 'OtpResponse';
  type: Scalars['String'];
};

export type RootMutationType = {
  __typename?: 'RootMutationType';
  /** Create a message channel (single) */
  chatCreateSingleChannel?: Maybe<ChannelType>;
  /** Login with email */
  loginAuthEmail?: Maybe<LoginResponse>;
  /** Send OTP for login or signup */
  sendAuthOtp?: Maybe<OtpResponse>;
  /** Signup with email */
  signupAuthEmail?: Maybe<LoginResponse>;
};


export type RootMutationTypeChatCreateSingleChannelArgs = {
  userId: Scalars['ID'];
};


export type RootMutationTypeLoginAuthEmailArgs = {
  email: Scalars['String'];
  otp: Scalars['String'];
};


export type RootMutationTypeSendAuthOtpArgs = {
  email: Scalars['String'];
};


export type RootMutationTypeSignupAuthEmailArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  otp: Scalars['String'];
  username: Scalars['String'];
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  /** Check if username already exists */
  checkUsername?: Maybe<CheckUsernameResponse>;
  /** 🤘 */
  hello?: Maybe<HelloType>;
};


export type RootQueryTypeCheckUsernameArgs = {
  username: Scalars['String'];
};

export type RootSubscriptionType = {
  __typename?: 'RootSubscriptionType';
  getChannels?: Maybe<Array<Maybe<ChannelType>>>;
};

export type LoginAuthEmailMutationVariables = Exact<{
  email: Scalars['String'];
  otp: Scalars['String'];
}>;


export type LoginAuthEmailMutation = { __typename?: 'RootMutationType', loginAuthEmail?: { __typename?: 'LoginResponse', token?: string | null, user?: { __typename?: 'ChatUser', avatar?: string | null, id?: string | null, name?: string | null, username?: string | null } | null } | null };

export type SendAuthOtpMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendAuthOtpMutation = { __typename?: 'RootMutationType', sendAuthOtp?: { __typename?: 'OtpResponse', type: string } | null };

export type SignupAuthEmailMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  name: Scalars['String'];
  otp: Scalars['String'];
}>;


export type SignupAuthEmailMutation = { __typename?: 'RootMutationType', signupAuthEmail?: { __typename?: 'LoginResponse', token?: string | null, user?: { __typename?: 'ChatUser', avatar?: string | null, id?: string | null, name?: string | null, username?: string | null } | null } | null };

export type CheckUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type CheckUsernameQuery = { __typename?: 'RootQueryType', checkUsername?: { __typename?: 'CheckUsernameResponse', available?: boolean | null } | null };


export const LoginAuthEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginAuthEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otp"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginAuthEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"otp"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<LoginAuthEmailMutation, LoginAuthEmailMutationVariables>;
export const SendAuthOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendAuthOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendAuthOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<SendAuthOtpMutation, SendAuthOtpMutationVariables>;
export const SignupAuthEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignupAuthEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otp"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signupAuthEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"otp"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<SignupAuthEmailMutation, SignupAuthEmailMutationVariables>;
export const CheckUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"available"}}]}}]}}]} as unknown as DocumentNode<CheckUsernameQuery, CheckUsernameQueryVariables>;