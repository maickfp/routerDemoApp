// MODULOS DE TERCEROS
// importar express
const express = require('express');

// MODULOS PROPIOS
// security
const security = require('./../../utilities/security');
// modelo
const User = require('./../../models/users');

// Inicializadores
const router = express.Router();

// Rutas
router.route('/')
    .get((req, res) => {
        User.find({}, (error, users) => {
            res.status(200).send(users);
        });
    })
    .post((req, res) => {
        const data = {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: security.encodePassword(req.body.password)
        };

        User.exists({username: data.username}, (error, userExist) => {
            if(userExist){
                res.status(200).send({
                    est: 2,
                    msg: `User ya existe`
                });
            }else{
                User.create(data, (error, user) => {
                    if(error || user === null){
                        res.status(200).send({
                            est: 2,
                            msg: `User no creado. ${error}`
                        });
                    }else{
                        res.status(200).send({
                            est: 1,
                            msg: `User creado`,
                            id: user._id
                        });
                    }
                });
            }
        });
    });
router.route('/login')
    .post((req, res) => {
        const username = req.body.username
        const password = req.body.password
        User.findOne({username: username}, (error, user) => {
            if(error || user === null){
                res.status(200).send({
                    est: 2,
                    msg: `User no existe. ${error}`
                });
            }else{
                if(security.comparePassword(password, user.password)){
                    res.status(200).send({
                        est: 1,
                        msg: `User autenticado`,
                        token: security.generateToken({
                            _id: user._id,
                            username: user.username,
                            name: user.name
                        })
                    });
                }else{
                    res.status(200).send({
                        est: 2,
                        msg: `Clave incorrecta`
                    });
                }
            }
        });
    });

module.exports = router;