// MODULOS DE TERCEROS
// importar express
const express = require('express');

// MODULOS PROPIOS
// servicio Tweet
const tweetsService = require('./../../services/tweets');
// utilidades - date
const dateUtility = require('./../../utilities/date');

// Inicializadores
const router = express.Router();

// Rutas
router.route('/')
    .get((req, res) => {
        res.status(200).send(tweetsService.loadTweets());
    })
    .post((req, res) => {
        const newTweet = {
            id: tweetsService.arrayLength(),
            title: req.body.title,
            content: req.body.content,
            date: dateUtility.getDate(),
            userId: req.body.userId
        };
        tweetsService.newTweet(newTweet);
        res.status(200).send({
            est: 1,
            msg: `Tweet creado`,
            id: newTweet.id
        });
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