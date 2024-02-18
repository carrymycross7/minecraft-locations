const mongoose = require('mongoose');
const graphql = require('graphql');
const {Location} = require("graphql");
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLString
} = graphql;
const Location = mongoose.model('location');

const LocationType = new GraphQLObjectType({
    name: "LocationType",
    fields: () => ({
        id: {type: GraphQLID},
        coord: {type: GraphQLString},
        description: {type: GraphQLString},
        world: {
            type: require('./world_type'),
            resolve(parentValue) {
                return Location.findById(parentValue).populate('world')
                    .then(location => {
                        return location.world;
                    })
            }
        }
    })
});

module.exports = LocationType;