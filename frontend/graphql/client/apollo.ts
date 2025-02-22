import { HttpLink, Observable, from } from "@apollo/client"
import { ApolloClient, InMemoryCache } from "@apollo/experimental-nextjs-app-support"
import { onError } from "@apollo/client/link/error"
import { setContext } from "@apollo/client/link/context"
import { updateToken } from "@/app/login/actions"

let refreshPromise: Promise<string | null> | null = null

export const makeClient = (initialToken: string | null) => {
  const refreshToken = async () => {
    if (!refreshPromise) {
      refreshPromise = fetch("http://localhost:8080/refresh", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      })
        .then(async (res) => {
          if (!res.ok) throw new Error(`Refresh failed: ${res.status}`)
          const { accessToken } = await res.json()
          if (accessToken) await updateToken(accessToken)
          return accessToken || null
        })
        .catch(() => {
          return null
        })
        .finally(() => {
          refreshPromise = null
        })
    }
    return refreshPromise
  }

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors?.some((err) => err.message === "Unauthorized")) {
      return new Observable((observer) => {
        refreshToken()
          .then((newToken) => {
            if (!newToken) {
              window?.location.assign("/login")
              return
            }

            operation.setContext(({ headers = {} }) => ({
              headers: {
                ...headers,
                Authorization: `Bearer ${newToken}`,
              },
            }))

            forward(operation).subscribe(observer)
          })
          .catch(() => window?.location.assign("/login"))
      })
    }
  })

  return new ApolloClient({
    link: from([
      setContext((_, { headers }) => ({
        headers: {
          ...headers,
          Authorization: initialToken ? `Bearer ${initialToken}` : "",
        },
      })),
      errorLink,
      new HttpLink({ uri: "http://localhost:8080/query" }),
    ]),
    cache: new InMemoryCache(),
  })
}
