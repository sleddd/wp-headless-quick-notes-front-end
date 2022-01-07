import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql, 
  useQuery
} from "@apollo/client";
import App from "./App";

const client = new ApolloClient({
  uri: 'http://journal.local/graphql',
  cache: new InMemoryCache()
});

render(
  <ApolloProvider client={client}>
  <App />
  </ApolloProvider>,
  document.getElementById("root")
);
