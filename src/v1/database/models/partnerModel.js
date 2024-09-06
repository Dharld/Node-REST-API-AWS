const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, required: true},
    country: {type: String, required: true},
    availableDates: {type: [String], required: true},
});

module.exports = mongoose.model('Partner', partnerSchema);
