import ApolloClient, { createNetworkInterface } from "apollo-client";

export const GRAPHQL_URI = "https://api.graph.cool/simple/v1/cj1xlxrrarawb0133bquto15e";

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: GRAPHQL_URI }),
});

export default client;
