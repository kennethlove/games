var Backbone = require('backbone');
var Game = require('../models/game');

module.exports = Backbone.Collection.extend({
    model: Game
});
