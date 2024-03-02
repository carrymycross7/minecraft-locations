import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from "react-router";
import ApolloClient from "apollo-client";
//import {ApolloError, ApolloProvider} from "react-apollo";

import App from './components/App'

const Root = () => {
  return (

      <Router history={hashHistory}>
        <Route path="/" component={App} />
      </Router>

  );
}

ReactDOM.render(
    <Root />,
    document.querySelector('#root')
)