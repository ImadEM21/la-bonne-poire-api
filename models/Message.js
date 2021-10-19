const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    to: {type: mongoose.Types.ObjectId, ref: "User", required: true},
    from: {type: mongoose.Types.ObjectId, ref: "User", required: true},
    message: {type: String, required: true}
}, {
    timestamps: true
});

module.exports = mongoose.model("Message", messageSchema);