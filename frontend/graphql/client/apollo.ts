import { HttpLink, from } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/experimental-nextjs-app-support";
import { onError } from '@apollo/client/link/error';

export const makeClient = () => {
  const httpLink = new HttpLink({
    uri: "http://localhost:8080/query",
    credentials: "include",
  })
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  return new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
  });
}
