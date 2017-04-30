import ApolloClient, { createNetworkInterface } from "apollo-client";

export const GRAPHQL_URI = "http://localhost:8000/graphql";

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: GRAPHQL_URI }),
});

export default client;
