// MODULOS DE TERCEROS
// importar express
const express = require('express');
// importar node-fetch - llamado sitio externo
const fetch = require('node-fetch');

// MODULOS PROPIOS
// configuracion
const config = require('./../../../config');

// Inicializadores
const router = express.Router();

// Rutas
router.route('/:city')
    .get((req, res) => {
        const city = req.params.city;
        fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${config.weatherApiKey}`)
            .then(res => res.json())
            .then(data => {
                res.status(200).send({temp: data.main.temp});
            });
    });

module.exports = router;