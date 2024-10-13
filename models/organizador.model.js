const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});

const TareaModel = mongoose.model('Tareas', tareaSchema);

module.exports = {
    TareaModel
};