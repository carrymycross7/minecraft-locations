const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const WorldType = require('./world_type');
const LocationType = require('./location_type');
const World = mongoose.model('world');
const Location = mongoose.model('location');


const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        worlds: {
            type: new GraphQLList(WorldType),
            resolve() {
                return World.find({});
            }
        },
        world: {
            type: WorldType,
            args: {id: {type: new GraphQLNonNull(GraphQLID)}},
            resolve(parentValue, {id}) {
                return World.findById(id);
            }
        },
        location: {
            type: LocationType,
            args: {id: {type: new GraphQLNonNull(GraphQLID)}},
            resolve(parentValue, {id}) {
                return Location.findById(id);
            }
        }
    })
});

module.exports = RootQuery;