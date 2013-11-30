var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
    defaults: {
        name: 'A game',
        minPlayers: 1,
        minTime: 1
    }
});
