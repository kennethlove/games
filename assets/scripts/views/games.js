var Marionette = require('backbone.marionette');
var GameView = require('./game')

module.exports = Marionette.CollectionView.extend({
    tagName: 'ul',
    itemView: GameView
});
