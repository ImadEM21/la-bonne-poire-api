const mongoose = require('mongoose');

const advertSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    condition: {type: String, required: true, enum: ["Neuf", "Très bon état", "Bon état", "Satisfaisant"]},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    owner: {type: mongoose.Types.ObjectId, ref: "User"},
}, {
    timestamps: true
});

module.exports = mongoose.model('Advert', advertSchema);