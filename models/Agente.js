const mongoose = require("mongoose");

const agenteSchema = new mongoose.Schema({
    nome: String,
    funcao: String
});

const Agente = mongoose.model("Agente", agenteSchema);

module.exports = Agente;