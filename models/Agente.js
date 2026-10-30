
const mongoose = require("mongoose");

const agenteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    funcao: {
        type: String,
        required: true
    },
    nacionalidade: {
        type: String,
        required: true
    },
    habilidades: [
        {
            nome: {
                type: String,
                required: true
            },
            tecla: {
                type: String,
                required: true
            },
            descricao: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model("Agente", agenteSchema);