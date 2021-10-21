const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    birthDate: {type: Date, required: true},
    phone: {type: Number, required: false},
    address: {type: String, required: false},
    zipCode: {type: String, required: false},
    city: {type: String, required: false},
    country: {type: String, required: false},
    avatar: {type: String, required: false},
    role: {type: String, required: true, enum: ['user', 'admin']},
    messages: [{type: mongoose.Types.ObjectId, ref: "Message"}]
}, {
    timestamps: true
});

userSchema.plugin(uniqueValidator, {message: "L'adresse email existe déjà, veuillez vous connecter."});

module.exports = mongoose.model("User", userSchema);