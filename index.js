// iniciando o Express
const { response } = require("express");
const express = require("express");
const app = express();
const connection = require("./database/database.js");
const Pergunta = require("./database/Pergunta");

const perguntaModel = require("./database/Pergunta")
connection.authenticate();


// definindo arquivos estaticos 
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Informando o renderizador de HTML
app.set('view engine', 'ejs');



// Rotas
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvar", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });

});












//  Rodando o projeto na porta 8000
app.listen(8000, function(erro) {
    if (erro) {
        console.log("Ocorreu um erro!");
    } else {
        console.log("Servidor rodando!");
    }
});