/*
* External Dependencies
*/
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ApolloProvider, } from "@apollo/client";

/*
* Internal Dependencies
*/
import Home from "./views/Home/Home";
import Day from "./views/Day/Day";
import { store } from "./redux/store";
import { useApolloClient } from "./hooks/use-app-apollo";
import { AuthProvider } from "./hooks/use-auth";

/*
* Styles
*/
import "normalize.css";
import "./styles.scss";


export default function App() {
  const client = useApolloClient();
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Switch>
              <Route path="/calendar/:month/:day/:year" component={Day} />
              <Route path="/" component={Home} />
            </Switch>
          </BrowserRouter>
        </Provider>
      </AuthProvider>
    </ApolloProvider>
  );
}
