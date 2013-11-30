'use strict';
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

var $ = require('jquery/dist/jquery')(window);
Backbone.$ = window.$;
Marionette.$ = window.$;

var Games = require('./collections/games');
var GamesView = require('./views/games');

var starterGames = new Games([
    {
        name: 'Pandemic',
        minPlayers: 1,
        minTime: 60
    },
    {
        name: 'Forbidden Island',
        minPlayers: 1,
        minTime: 30
    }
]);

var GamesApp = new Marionette.Application();

GamesApp.addRegions({
    mainRegion: '#container',
    formRegion: '#form',
    listRegion: '#list'
});

GamesApp.on('initialize:after', function() {
    var gamesView = new GamesView({
        collection: starterGames
    });
    GamesApp.listRegion.show(gamesView);
});

GamesApp.start();
