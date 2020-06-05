// MODULOS PROPIOS
// importar security
const security = require('./../../utilities/security');

const auth = (req, res, next) => {
    const token = req.header("x-auth");
    if(token === undefined){
        req.user = config.defaultUser;
    }else if(!security.verifyToken(token, req)){
        req.user = config.defaultUser;
    } 
};

module.exports = auth;