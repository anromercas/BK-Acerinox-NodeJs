const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let repeticionValida = {
    values: ['PUNTUAL', 'PUNTUAL-ALEATORIA', 'PUNTUAL-SEMANAL', 'PUNTUAL-MENSUAL', 'SEMANAL', 'MENSUAL'],
    message: '{VALUE} no es un rol válido'
};

let tareaSchema = new Schema({
    codigo: { // este código me va a servir para poder identificar las tareas repetitivas, para poder, en caso de modificación o borrado, poder obtener todas las repeticiones
        type: String,
        required: [ true, 'El codigo es necesario']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    tipo: {
        type: String,
        required: [true, 'El tipo es necesario']
    },
    repeticion: {
        type: String,
        default: 'USER_ROLE',
        enum: repeticionValida
    },
    fechasAleatoria: [{
        type: Date
    }],
    fechaInicio: {
        type: Date,
        default: new Date()
    },
    fechaFin: {
        type: Date
    },
    repeticiones: {
        type: Number
    },
    fechaRealizado: {
        type: Date
    },
    realizado: {
        type: Boolean,
        default: false
    },
    expirado: {
        type: Boolean,
        default: false,
    },
    usuario: {
        type: Schema.ObjectId, 
        ref: 'Usuario'
    }
});


module.exports = mongoose.model('Tarea', tareaSchema);