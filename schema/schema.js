const graphql = require('graphql');
const axios = require('axios');
const {response} = require("express");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

const WorldType = new GraphQLObjectType({
    name: 'World',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        world: {
            type: WorldType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
               console.log(args); // debug - remove
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
