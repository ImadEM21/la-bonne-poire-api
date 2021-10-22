const mongoose = require('mongoose');

const offerSchema = mongoose.Schema({
    from: {type: mongoose.Types.ObjectId, ref: "User"},
    to: {type: mongoose.Types.ObjectId, ref: "User"},
    advert: {type: mongoose.Types.ObjectId, ref: "Advert"},
    offer: {type: Number, required: true},
    message: {type: String, required: false},
    status: {type: String, required: true, enum: ['pending', 'refused', 'accepted']}
}, {
    timestamps: true
});

module.exports = mongoose.model("Offer", offerSchema);