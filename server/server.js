const bodyParser = require('body-parser');
const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const models = require('./models');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const CONNCECTION_URI = 'mongodb://localhost:27017/minecraft';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4 // Use IPv4, skip trying IPv6
}

const app = express();

app.use("/graphql", expressGraphQL({
  schema,
  graphiql: true
}))

mongoose.Promise = global.Promise;
mongoose.connect(CONNCECTION_URI, options)
    .then(() => {console.log("Connected to MongoDB")})
    .catch((err) => console.log(err));


app.use(bodyParser.json());
app.use(
    '/graphql',
    expressGraphQL({
      schema,
      graphiql: true
    })
);

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;