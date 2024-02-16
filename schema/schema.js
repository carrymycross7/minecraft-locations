const graphql = require('graphql');
const axios = require('axios');

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
        },
        deleteLocation: {
          type: LocationType,
          args: {
              id: {type: new GraphQLNonNull(GraphQLString)}
          },
          resolve(parentValue, {id}) {
              return axios.delete(`http://localhost:8000/worlds/${id}`)
                  .then(res => res.data)
          }
        },
        editLocation: {
            type: LocationType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args) {
                return axios.patch(`http://localhost:8000/worlds/${args.id}`, args)
                    .then(res => res.data)
            }

        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});
