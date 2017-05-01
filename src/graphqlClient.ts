import ApolloClient, { createNetworkInterface } from "apollo-client";

export const GRAPHQL_URI = process.env.DEBUG ? "http://localhost:8000/graphql" : "http://buybag.com.ua/graphql";

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: GRAPHQL_URI }),
});

export default client;
