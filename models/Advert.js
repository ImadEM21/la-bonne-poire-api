const mongoose = require('mongoose');

const advertSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    owner: {type: mongoose.Types.ObjectId, ref: "User"},
}, {
    timestamps: true
});

module.exports = mongoose.model('Advert', advertSchema);