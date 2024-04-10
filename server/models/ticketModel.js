const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema ({
    name: {type: String, required: true},
    Email: {type: String, required: true},
    Message: {type: String, required: true}
})


module.exports = mongoose.model('ticket', ticketSchema);