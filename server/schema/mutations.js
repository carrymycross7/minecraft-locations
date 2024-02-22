const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Location = mongoose.model('location');
const World = mongoose.model('world');
const LocationType = require('./location_type');
const WorldType = require('./world_type');


const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addWorld: {
            type: WorldType,
            args: {
                name: {type: GraphQLString},
                description: {type: GraphQLString}
            },
            resolve(parentValue, {name, description}) {
                return new World({name, description}).save();
            }
        }
    }
});


module.exports = mutation;