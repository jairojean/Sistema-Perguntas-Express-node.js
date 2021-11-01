// iniciando o Express
const { response } = require("express");
const express = require("express");
const app = express();
const connection = require("./database/database.js");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

const perguntaModel = require("./database/Pergunta")
connection.authenticate();


// definindo arquivos estaticos 
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Informando o renderizador de HTML
app.set('view engine', 'ejs');



// Rotas
/*
    Pergunta

    Buscar tudo
*/
app.get("/", (req, res) => {
    Pergunta.findAll({
        raw: true,
        //  odernando
        order: [
            ['id', 'desc']
        ]
    }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });
});


app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

//detalhes
app.get("/responder/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) { // Pergunta encontrada

            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                order: [
                    ['id', 'DESC']
                ]
            }).then(respostas => {
                res.render("responder", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });

        } else { // Não encontrada
            res.redirect("/");
        }
    });
});


// salvar
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

// Responder
app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var idPergunta = req.body.idPergunta;

    Resposta.create({
        corpo: corpo,
        idPergunta: idPergunta
    }).then(() => {
        res.redirect("/responder/" + idPergunta);
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