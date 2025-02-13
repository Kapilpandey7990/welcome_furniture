const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: String,
    contactNumber: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Baburao = mongoose.model('Baburao', contactSchema);
module.exports = Baburao;
