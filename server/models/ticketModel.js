const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema ({
    name: {type: String, required: true},
    email: {type: String, required: true},
    message: {type: String, required: true},
    status: {type: String},
    response: {type: String}
})


module.exports = mongoose.model('ticket', ticketSchema);