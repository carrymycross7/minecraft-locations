import React from 'react';
import ReactDOM from 'react-dom/client';
import {Router, Route, hashHistory, IndexRoute} from "react-router";
//import ApolloClient from "apollo-client";
//import {ApolloError, ApolloProvider} from "react-apollo";

import App from './components/App'

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
