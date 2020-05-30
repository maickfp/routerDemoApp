// MODULOS DE TERCEROS
// importar express
const express = require('express');

// MODULOS PROPIOS
// servicio Tweet
//const tweetsService = require('./../../services/tweets');
// utilidades - date
const dateUtility = require('./../../utilities/date');
// modelo
const Tweet = require('./../../models/tweets')

// Inicializadores
const router = express.Router();

// Rutas
router.route('/')
    .get((req, res) => {
        Tweet.find({}, (error, tweets) => {
            res.status(200).send(tweets);
        });
    })
    .post((req, res) => {
        const data = {
            title: req.body.title,
            content: req.body.content,
            date: dateUtility.getDate(),
            user: 'maickfp'
        };

        Tweet.exists({content: data.content}, (error, tweetExist) => {
            if(tweetExist){
                res.status(200).send({
                    est: 2,
                    msg: `Tweet ya existe`
                });
            }else{
                Tweet.create(data, (error, tweet) => {
                    if(error || tweet === null){
                        res.status(200).send({
                            est: 2,
                            msg: `Tweet no creado. ${error}`
                        });
                    }else{
                        res.status(200).send({
                            est: 1,
                            msg: `Tweet creado`,
                            id: tweet._id
                        });
                    }
                });
            }
        });

    })
    .put((req, res) => {
        const id = req.body.id;
        const data = {
            title: req.body.title,
            content: req.body.content,
            date: dateUtility.getDate(),
            user: 'maickfp'
        };
        
        Tweet.findByIdAndUpdate(id, data, (error, tweet) => {
            if(error || tweet === null){
                res.status(200).send({
                    est: 2,
                    msg: `Tweet no existe`
                });
            }else{
                res.status(200).send({
                    est: 1,
                    msg: `Tweet actualizado`
                });
            }
        });
    });
router.route('/:id')
    .get((req, res) => {
        const id = req.params.id;

        Tweet.findById(id, (error, tweet) => {
            if(error || tweet === null){
                res.status(200).send({
                    est: 2,
                    msg: `Tweet no existe`
                });
            }else{
                res.status(200).send({
                    est: 1,
                    msg: `Tweet encontrado`,
                    tweet
                });
            }
        });
    })
    .delete((req, res) => {
        const id = req.params.id;
        
        Tweet.findByIdAndDelete(id, (error, tweet) => {
            if(error || tweet === null){
                res.status(200).send({
                    est: 2,
                    msg: `Tweet no existe`
                });
            }else{
                res.status(200).send({
                    est: 1,
                    msg: `Tweet eliminado`
                });
            }
        });
    });

module.exports = router;