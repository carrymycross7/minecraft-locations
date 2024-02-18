const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorldSchema = {
    name: {type: String},
    description: {type: String},
    locations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'location'
        }
    ]
}

WorldSchema.statics.findWorld = function (id) {
    return this.findById(id)
        .then(world => {
            return world;
        })
}

WorldSchema.statics.findLocations = function (id) {
    return this.findById(id)
        .populate('locations')
        .then(world => {
            return world.locations;
        })
}


mongoose.model('world', WorldSchema);
