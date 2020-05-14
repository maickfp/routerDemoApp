// MODULOS DE TERCEROS
// importar express
const express = require('express');

// Inicializadores
const router = express.Router();

// Rutas
router.route('/')
    .get((req, res) => {
        res.status(200).send(`Lista de tweets`);
    })
    .post((req, res) => {
        res.status(200).send(`Nuevo tweet`);
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