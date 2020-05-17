// MODULOS DE TERCEROS
// importar express
const express = require('express');

// Inicializadores
const router = express.Router();

const afterSend = (req, res, next) => {
    if(res.locals.resp !== undefined){
        console.log(`resp:${res.locals.resp.msg}`);
    }
    next();
};

// Rutas
router.route('/')
    .get(afterSend, (req, res, next) => {
        const resp = {
            cod: 1,
            msg: `Lista de usuarios`
        };
        res.locals.resp = resp;
        res.status(200).send(resp);
        next();
    }, afterSend)
    .post((req, res) => {
        res.status(200).send(`Nuevo usuario`);
    });
router.route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        res.status(200).send(`Detalle del usuario ${id}`);
    })
    .delete((req, res) => {
        const id = req.params.id;
        res.status(200).send(`Eliminar el usuario ${id}`);
    })
    .put((req, res) => {
        const id = req.params.id;
        res.status(200).send(`Actualizar el usuario ${id}`);
    });

module.exports = router;