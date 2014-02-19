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
        app.use(app.router);
        app.use(function(err, req, res, next) {
            res.status(500);
            res.render('500');
        });
        app.use(function(req, res, next) {
            res.status(404);
            res.render('404');
        });
    });
};