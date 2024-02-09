const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const CONNCECTION_URI = 'mongodb://localhost:27017/minecraft';

const app = express();

app.use("/graphql", expressGraphQL({
  schema,
  graphiql: true
}))

mongoose.connect(CONNCECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4
})
    .then(() => console.log('Connection to the database was successful'))
    .catch(err => console.error('Connection to the database failed: ', err));

app.listen(4000, () => {
  console.log('Listening');
});
