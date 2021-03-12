import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client"

export const isLoggedInVar = makeVar(false)

export const client = new ApolloClient({
  uri: "https://api-samplepcbmarket.herokuapp.com/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar()
            },
          },
        },
      },
    },
  }),
})

export default client
