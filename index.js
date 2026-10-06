const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Agente = require("./models/Agente");

const app = express();

app.use(express.json());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB conectado!");
    })
    .catch((erro) => {
        console.log("Erro ao conectar ao MongoDB:", erro);
    });

// GET - listar agentes
app.get("/agentes", async (req, res) => {
    const agentes = await Agente.find();

    res.json(agentes);
});

// POST - cadastrar agente
app.post("/agentes", async (req, res) => {
    const novoAgente = new Agente({
        nome: req.body.nome,
        funcao: req.body.funcao
    });

    await novoAgente.save();

    res.status(201).json(novoAgente);
});

// GET - buscar agente por ID
app.get("/agentes/:id", async (req, res) => {
    const agente = await Agente.findById(req.params.id);

    if (!agente) {
        return res.status(404).json({
            mensagem: "Agente não encontrado"
        });
    }

    res.json(agente);
});

// PUT - atualizar agente
app.put("/agentes/:id", async (req, res) => {
    const agente = await Agente.findByIdAndUpdate(
        req.params.id,
        {
            nome: req.body.nome,
            funcao: req.body.funcao
        },
        { new: true }
    );

    if (!agente) {
        return res.status(404).json({
            mensagem: "Agente não encontrado"
        });
    }

    res.json(agente);
});

// DELETE - excluir agente
app.delete("/agentes/:id", async (req, res) => {
    const agente = await Agente.findByIdAndDelete(req.params.id);

    if (!agente) {
        return res.status(404).json({
            mensagem: "Agente não encontrado"
        });
    }

    res.json({
        mensagem: "Agente excluído com sucesso"
    });
});

// Rota inicial
app.get("/", (req, res) => {
    res.json({
        mensagem: "API Valorant funcionando!"
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});