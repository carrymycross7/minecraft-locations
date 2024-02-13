const graphql = require('graphql');
const axios = require('axios');
const {response} = require("express");

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

const LocationType = new GraphQLObjectType({
    name: 'World',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        world: {
            type: LocationType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/worlds/${args.id}`)
                    .then(res => res.data)
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addLocation: {
            type: LocationType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, {name,description}) {
                return axios.post('http://localhost:8000/worlds', {name,description})
                    .then(res => res.data)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});
