import * as React from "react";
import { Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { ApolloProvider } from "react-apollo";
import { Router, Route } from "react-router";
import client from "./graphqlClient";
import store from "./store";
import history from "./history"
import { Layout } from "./modules/layout/index";
import { HomePage, ProductPage, CategoryPage } from "./pages/index";

const App = () => {
  return (
    <ApolloProvider store={store} client={client}>
      <ConnectedRouter history={history}>
        <Layout>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/category/:id" component={CategoryPage} />
            <Route path="/product/:id" component={ProductPage} />
          </Switch>
        </Layout>
      </ConnectedRouter>
    </ApolloProvider>
  )
}

export default App;
