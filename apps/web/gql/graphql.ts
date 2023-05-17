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
  /** Represents an uploaded file. */
  Upload: any;
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
  avatar: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  username: Scalars['String'];
};

export type HelloType = {
  __typename?: 'HelloType';
  hello?: Maybe<Scalars['String']>;
};

export type ImageType = {
  __typename?: 'ImageType';
  description?: Maybe<Scalars['String']>;
  height: Scalars['Int'];
  image: Scalars['String'];
  post: PostType;
  width: Scalars['Int'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token: Scalars['String'];
  user: MeResponse;
};

export type MeResponse = {
  __typename?: 'MeResponse';
  avatar: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  setupComplete: Scalars['Boolean'];
  username: Scalars['String'];
};

export type OrsicType = {
  __typename?: 'OrsicType';
  content: Scalars['String'];
  post: PostType;
  title?: Maybe<Scalars['String']>;
};

export type OtpResponse = {
  __typename?: 'OtpResponse';
  type: Scalars['String'];
};

export type PostType = {
  __typename?: 'PostType';
  id: Scalars['ID'];
  insertedAt: Scalars['DateTime'];
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type RootMutationType = {
  __typename?: 'RootMutationType';
  /** Create a message channel (single) */
  chatCreateSingleChannel?: Maybe<ChannelType>;
  createImage?: Maybe<ImageType>;
  createOrsic?: Maybe<OrsicType>;
  /** Login with email */
  loginAuthEmail?: Maybe<LoginResponse>;
  /** Send OTP for login or signup */
  sendAuthOtp?: Maybe<OtpResponse>;
  /** Setup languages */
  setupLanguages?: Maybe<MeResponse>;
  /** Signup with email */
  signupAuthEmail?: Maybe<LoginResponse>;
};


export type RootMutationTypeChatCreateSingleChannelArgs = {
  userId: Scalars['ID'];
};


export type RootMutationTypeCreateImageArgs = {
  description?: InputMaybe<Scalars['String']>;
  image: Scalars['Upload'];
};


export type RootMutationTypeCreateOrsicArgs = {
  content: Scalars['String'];
};


export type RootMutationTypeLoginAuthEmailArgs = {
  email: Scalars['String'];
  otp: Scalars['String'];
};


export type RootMutationTypeSendAuthOtpArgs = {
  email: Scalars['String'];
};


export type RootMutationTypeSetupLanguagesArgs = {
  languages: Array<Scalars['String']>;
};


export type RootMutationTypeSignupAuthEmailArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  otp: Scalars['String'];
  username: Scalars['String'];
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  getImage?: Maybe<ImageType>;
  /** 🤘 */
  hello?: Maybe<HelloType>;
  /** Get current user */
  me: MeResponse;
};


export type RootQueryTypeGetImageArgs = {
  slug: Scalars['String'];
};

export type RootSubscriptionType = {
  __typename?: 'RootSubscriptionType';
  getChannels?: Maybe<Array<Maybe<ChannelType>>>;
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  username: Scalars['String'];
};

export type CreateImageMutationVariables = Exact<{
  image: Scalars['Upload'];
  description?: InputMaybe<Scalars['String']>;
}>;


export type CreateImageMutation = { __typename?: 'RootMutationType', createImage?: { __typename?: 'ImageType', post: { __typename?: 'PostType', id: string, slug: string } } | null };

export type CreateOrsicMutationVariables = Exact<{
  content: Scalars['String'];
}>;


export type CreateOrsicMutation = { __typename?: 'RootMutationType', createOrsic?: { __typename?: 'OrsicType', post: { __typename?: 'PostType', id: string, slug: string } } | null };

export type LoginAuthEmailMutationVariables = Exact<{
  email: Scalars['String'];
  otp: Scalars['String'];
}>;


export type LoginAuthEmailMutation = { __typename?: 'RootMutationType', loginAuthEmail?: { __typename?: 'LoginResponse', token: string, user: { __typename?: 'MeResponse', avatar: string, id: string, name: string, username: string, setupComplete: boolean } } | null };

export type SendAuthOtpMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendAuthOtpMutation = { __typename?: 'RootMutationType', sendAuthOtp?: { __typename?: 'OtpResponse', type: string } | null };

export type SetupLanguagesMutationVariables = Exact<{
  languages: Array<Scalars['String']> | Scalars['String'];
}>;


export type SetupLanguagesMutation = { __typename?: 'RootMutationType', setupLanguages?: { __typename?: 'MeResponse', avatar: string, id: string, name: string, setupComplete: boolean, username: string } | null };

export type SignupAuthEmailMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  name: Scalars['String'];
  otp: Scalars['String'];
}>;


export type SignupAuthEmailMutation = { __typename?: 'RootMutationType', signupAuthEmail?: { __typename?: 'LoginResponse', token: string, user: { __typename?: 'MeResponse', avatar: string, id: string, name: string, username: string, setupComplete: boolean } } | null };

export type ImageQueryQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type ImageQueryQuery = { __typename?: 'RootQueryType', getImage?: { __typename?: 'ImageType', description?: string | null, width: number, height: number, image: string, post: { __typename?: 'PostType', id: string, insertedAt: any, slug: string, updatedAt: any, user: { __typename?: 'User', avatar: string, id: string, name: string, username: string } } } | null };

export type MeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQueryQuery = { __typename?: 'RootQueryType', me: { __typename?: 'MeResponse', avatar: string, id: string, name: string, username: string, setupComplete: boolean } };


export const CreateImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<CreateImageMutation, CreateImageMutationVariables>;
export const CreateOrsicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrsic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrsic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<CreateOrsicMutation, CreateOrsicMutationVariables>;
export const LoginAuthEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginAuthEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otp"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginAuthEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"otp"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"setupComplete"}}]}}]}}]}}]} as unknown as DocumentNode<LoginAuthEmailMutation, LoginAuthEmailMutationVariables>;
export const SendAuthOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendAuthOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendAuthOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<SendAuthOtpMutation, SendAuthOtpMutationVariables>;
export const SetupLanguagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetupLanguages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"languages"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setupLanguages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"languages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"languages"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"setupComplete"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<SetupLanguagesMutation, SetupLanguagesMutationVariables>;
export const SignupAuthEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignupAuthEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otp"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signupAuthEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"otp"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"setupComplete"}}]}}]}}]}}]} as unknown as DocumentNode<SignupAuthEmailMutation, SignupAuthEmailMutationVariables>;
export const ImageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ImageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"insertedAt"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ImageQueryQuery, ImageQueryQueryVariables>;
export const MeQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MeQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"setupComplete"}}]}}]}}]} as unknown as DocumentNode<MeQueryQuery, MeQueryQueryVariables>;