const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull
} = graphql;
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
        },
        editWorld: {
            type: WorldType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                description: {type: GraphQLString}
            },
            async resolve(parentValue, args) {
                return await World.findOneAndUpdate(
                    {_id: args.id},
                    {name: args.name, description: args.description},
                    {new: true}
                )
                    .then(updatedWorld => updatedWorld)

            }
        }
    }
});


module.exports = mutation;