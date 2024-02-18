const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = {
    world: {
        type: Schema.Types.ObjectId,
        ref: 'world'
    },
    coord: {type: String},
    description: {type: String},
    dimension: {type: String}
}

LocationSchema.statics.like = function(id) {
    const Location = mongoose.model('location');

    return Location.findById(id)
        .then(location => {
            return location;
        })
}

mongoose.model('location', LocationSchema);