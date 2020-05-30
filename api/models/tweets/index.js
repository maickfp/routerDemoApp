//MODULOS DE TECEROS
const mongoose = require('mongoose');

// Variables
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;