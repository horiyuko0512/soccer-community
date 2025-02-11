import { HttpLink, from } from "@apollo/client"
import { ApolloClient, InMemoryCache } from "@apollo/experimental-nextjs-app-support"
import { onError } from "@apollo/client/link/error"
import { setContext } from '@apollo/client/link/context';

export const makeClient = (token: string | null) => {
  const httpLink = new HttpLink({
    uri: "http://localhost:8080/query",
    // credentials: "include",
  })
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
      )
    if (networkError) console.log(`[Network error]: ${networkError}`)
  })

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return new ApolloClient({
    link: from([authLink, errorLink, httpLink]),
    cache: new InMemoryCache(),
  })
}
