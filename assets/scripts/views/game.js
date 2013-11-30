var Marionette = require('backbone.marionette');
var _ = require('underscore');

module.exports = Marionette.ItemView.extend({
    tagName: 'li',
    template: _.template('<a href="#"><%-name%></a>')
});
