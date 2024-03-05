import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery
} from '@apollo/client';
import gql from "graphql-tag";


// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:27017/minecraft',
  cache: new InMemoryCache()
});

const GET_LOCATIONS = gql`
  query AllLocations {
    minecraft {
      description
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  return (
      <ApolloProvider client={client}>
        <div>APP</div>
      </ApolloProvider>
  );
}

export default App;