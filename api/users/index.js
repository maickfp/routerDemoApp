// MODULOS DE TERCEROS
// importar express
const express = require('express');

// Inicializadores
const router = express.Router();

// Rutas
router.route('/')
    .get((req, res) => {
        res.status(200).send(`Lista de usuarios`);
    })
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