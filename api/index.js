// MODULOS DE TERCEROS
// importar express
const express = require('express');

// Inicializadores
const router = express.Router();

//MODULOS PROPIOS
const tweets = require("./controllers/tweets");
const users = require("./controllers/users");
const logger = require("./middlewares/logger");

router.use(logger);
router.use('/tweets', tweets);
router.use('/users', users);

module.exports = router;