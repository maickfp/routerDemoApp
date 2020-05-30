// MODULOS DE TERCEROS
// importar mongoose
const mongoose = require('mongoose');

// Variables
const config = {
    host: '127.0.0.1',
    port: 27017,
    name: 'twitter_db'
};

// Inicializadores
const connect = () => {
    mongoose.connect(`mongodb://${config.host}:${config.port}/${config.name}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};

module.exports = connect;