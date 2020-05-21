// MODULOS DE TERCEROS
// importar express
const express = require('express');
// importar body-parser
const bodyParser = require('body-parser');

//MODULOS PROPIOS
const config = require("./config");
const api = require("./api");

// Inicializadores
const app = express();

// CONFIGURACIONES GENERALES
// parse application/json
app.use(bodyParser.json());
app.use('/api', api);
app.use(express.static('./public'));

// Iniciar servidor
app.listen(config.port, ()=>{
    console.log(`Servidor iniciado en puerto ${config.port}`);
});