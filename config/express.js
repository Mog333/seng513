var express = require('express'),
    path = require('path'),
    config = require('./config');


module.exports = function(app) {
    app.configure(function() {
        app.use(express.compress());
        app.use(express.static(path.join(config.root, 'public')));
        app.set('port', config.port.toString());
        app.set('views', path.join(config.root, 'app', 'views'));
        app.set('view engine', 'html');
        app.set('layout', 'layout');
        app.enable('view cache');
        app.engine('html', require('hogan-express'));
        app.use(express.urlencoded());
        app.use(express.json());
        app.use(express.methodOverride());
    });
};
