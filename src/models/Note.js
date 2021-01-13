const mongoose = require('mongoose');
const {Schema} = mongoose; 

const NoteSchema = new Schema({
    idVenta: {type: Number, required: true},
    descVenta: {type: String, required: true},
    valorVenta: {type: Number, required: true},
    fechaActual: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Note', NoteSchema);