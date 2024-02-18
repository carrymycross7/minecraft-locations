const mongoose = require('mongoose');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLString
} = graphql;
const LocationType = require('./location_type');
const World = mongoose.model('world');

const WorldType = {
    name: "WorldType",
    fields: () => ({
         id: {type: GraphQLID},
        name: {type: GraphQLString},
        locations: {
             type: new GraphQLList(LocationType),
            resolve(parentValue) {
                 return World.findLocations(parentValue.id);
            }
        }
    })
};

module.exports = WorldType;