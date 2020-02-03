import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-client";
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({
  uri: "http://floriansahbi.com/graphql"
  // uri: "http://localhost:5000/graphql"
});

const wsLink = new WebSocketLink({
  uri: "ws://floriansahbi.com/subscriptions",
  // uri: "ws://localhost:5000/subscriptions",
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById('root'));
