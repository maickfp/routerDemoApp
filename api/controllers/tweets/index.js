// MODULOS DE TERCEROS
// importar express
const express = require('express');

// MODULOS PROPIOS
// servicio Tweet
const tweets = require('./../../services/tweets');

// Inicializadores
const router = express.Router();

// Rutas
router.route('/')
    .get((req, res) => {
        res.status(200).send(tweets.loadTweets());
    })
    .post((req, res) => {
        const newTweet = {
            id: tweets.arrayLength(),
            content: req.body.content,
            date: Date.now(),
            userId: req.body.userId
        };
        tweets.newTweet(newTweet);
        res.status(200).send(`Tweet creado con id ${newTweet.id}`);
    });
router.route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        res.status(200).send(`Detalle del tweet ${id}`);
    })
    .delete((req, res) => {
        const id = req.params.id;
        res.status(200).send(`Eliminar el tweet ${id}`);
    })
    .put((req, res) => {
        const id = req.params.id;
        res.status(200).send(`Actualizar el tweet ${id}`);
    });

module.exports = router;