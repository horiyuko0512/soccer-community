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
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "mutation CreateUser($input: CreateUserInput!) {\n  createUser(input: $input) {\n    id\n    nickname\n    email\n    introduction\n  }\n}\n\nmutation UpdateUser($input: UpdateUserInput!) {\n  updateUser(input: $input) {\n    id\n    nickname\n    email\n    introduction\n  }\n}\n\nmutation CreateMatch($input: CreateMatchInput!) {\n  createMatch(input: $input) {\n    id\n    title\n    date\n    location\n    level\n    participants\n    fee\n    notes\n    creatorID\n    isApplied\n  }\n}\n\nmutation UpdateMatch($id: ID!, $input: UpdateMatchInput!) {\n  updateMatch(id: $id, input: $input) {\n    id\n    title\n    date\n    location\n    level\n    participants\n    fee\n    notes\n    creatorID\n    isApplied\n  }\n}\n\nmutation CreateParticipation($input: CreateParticipationInput!) {\n  createParticipation(input: $input) {\n    id\n    userID\n    matchID\n    status\n  }\n}\n\nmutation UpdateParticipation($id: ID!, $input: UpdateParticipationInput!) {\n  updateParticipation(id: $id, input: $input) {\n    id\n    userID\n    matchID\n    status\n  }\n}\n\nmutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password)\n}": types.CreateUserDocument,
    "query User($id: ID!) {\n  user(id: $id) {\n    id\n    nickname\n    email\n    introduction\n  }\n}\n\nquery Users {\n  users {\n    id\n    nickname\n    email\n    introduction\n  }\n}\n\nquery Match($id: ID!) {\n  matche(id: $id) {\n    id\n    title\n    date\n    location\n    level\n    participants\n    fee\n    notes\n    creatorID\n    isApplied\n  }\n}\n\nquery Matches {\n  matches {\n    id\n    title\n    date\n    location\n    level\n    participants\n    fee\n    notes\n    creatorID\n    isApplied\n  }\n}\n\nquery Participation($id: ID!) {\n  participation(id: $id) {\n    id\n    userID\n    matchID\n    status\n  }\n}\n\nquery Participations {\n  participations {\n    id\n    userID\n    matchID\n    status\n  }\n}\n\nquery Node($id: ID!) {\n  node(id: $id) {\n    id\n  }\n}\n\nquery Nodes($ids: [ID!]!) {\n  nodes(ids: $ids) {\n    id\n  }\n}": types.UserDocument,
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
export function graphql(source: "mutation CreateUser($input: CreateUserInput!) {\n  createUser(input: $input) {\n    id\n    nickname\n    email\n    introduction\n  }\n}\n\nmutation UpdateUser($input: UpdateUserInput!) {\n  updateUser(input: $input) {\n    id\n    nickname\n    email\n    introduction\n  }\n}\n\nmutation CreateMatch($input: CreateMatchInput!) {\n  createMatch(input: $input) {\n    id\n    title\n    date\n    location\n    level\n    participants\n    fee\n    notes\n    creatorID\n    isApplied\n  }\n}\n\nmutation UpdateMatch($id: ID!, $input: UpdateMatchInput!) {\n  updateMatch(id: $id, input: $input) {\n    id\n    title\n    date\n    location\n    level\n    participants\n    fee\n    notes\n    creatorID\n    isApplied\n  }\n}\n\nmutation CreateParticipation($input: CreateParticipationInput!) {\n  createParticipation(input: $input) {\n    id\n    userID\n    matchID\n    status\n  }\n}\n\nmutation UpdateParticipation($id: ID!, $input: UpdateParticipationInput!) {\n  updateParticipation(id: $id, input: $input) {\n    id\n    userID\n    matchID\n    status\n  }\n}\n\nmutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password)\n}"): (typeof documents)["mutation CreateUser($input: CreateUserInput!) {\n  createUser(input: $input) {\n    id\n    nickname\n    email\n    introduction\n  }\n}\n\nmutation UpdateUser($input: UpdateUserInput!) {\n  updateUser(input: $input) {\n    id\n    nickname\n    email\n    introduction\n  }\n}\n\nmutation CreateMatch($input: CreateMatchInput!) {\n  createMatch(input: $input) {\n    id\n    title\n    date\n    location\n    level\n    participants\n    fee\n    notes\n    creatorID\n    isApplied\n  }\n}\n\nmutation UpdateMatch($id: ID!, $input: UpdateMatchInput!) {\n  updateMatch(id: $id, input: $input) {\n    id\n    title\n    date\n    location\n    level\n    participants\n    fee\n    notes\n    creatorID\n    isApplied\n  }\n}\n\nmutation CreateParticipation($input: CreateParticipationInput!) {\n  createParticipation(input: $input) {\n    id\n    userID\n    matchID\n    status\n  }\n}\n\nmutation UpdateParticipation($id: ID!, $input: UpdateParticipationInput!) {\n  updateParticipation(id: $id, input: $input) {\n    id\n    userID\n    matchID\n    status\n  }\n}\n\nmutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query User($id: ID!) {\n  user(id: $id) {\n    id\n    nickname\n    email\n    introduction\n  }\n}\n\nquery Users {\n  users {\n    id\n    nickname\n    email\n    introduction\n  }\n}\n\nquery Match($id: ID!) {\n  matche(id: $id) {\n    id\n    title\n    date\n    location\n    level\n    participants\n    fee\n    notes\n    creatorID\n    isApplied\n  }\n}\n\nquery Matches {\n  matches {\n    id\n    title\n    date\n    location\n    level\n    participants\n    fee\n    notes\n    creatorID\n    isApplied\n  }\n}\n\nquery Participation($id: ID!) {\n  participation(id: $id) {\n    id\n    userID\n    matchID\n    status\n  }\n}\n\nquery Participations {\n  participations {\n    id\n    userID\n    matchID\n    status\n  }\n}\n\nquery Node($id: ID!) {\n  node(id: $id) {\n    id\n  }\n}\n\nquery Nodes($ids: [ID!]!) {\n  nodes(ids: $ids) {\n    id\n  }\n}"): (typeof documents)["query User($id: ID!) {\n  user(id: $id) {\n    id\n    nickname\n    email\n    introduction\n  }\n}\n\nquery Users {\n  users {\n    id\n    nickname\n    email\n    introduction\n  }\n}\n\nquery Match($id: ID!) {\n  matche(id: $id) {\n    id\n    title\n    date\n    location\n    level\n    participants\n    fee\n    notes\n    creatorID\n    isApplied\n  }\n}\n\nquery Matches {\n  matches {\n    id\n    title\n    date\n    location\n    level\n    participants\n    fee\n    notes\n    creatorID\n    isApplied\n  }\n}\n\nquery Participation($id: ID!) {\n  participation(id: $id) {\n    id\n    userID\n    matchID\n    status\n  }\n}\n\nquery Participations {\n  participations {\n    id\n    userID\n    matchID\n    status\n  }\n}\n\nquery Node($id: ID!) {\n  node(id: $id) {\n    id\n  }\n}\n\nquery Nodes($ids: [ID!]!) {\n  nodes(ids: $ids) {\n    id\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;