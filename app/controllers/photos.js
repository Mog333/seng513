var db = require('../../config/db'),
    uploader = require('../../lib/image_uploader');

module.exports = {
    newForm: function(req, res, next) {
        res.locals = { error: req.flash('error') };
        res.render('photos/new');
    },

    create: function(req, res, next) {
        uploader.upload(req).then(function(file) {
            db.Photo.create({filepath: file.filepath, name: file.filename, contentType: file.contentType}).then(function() {
                res.redirect(302, '/feed');
            }).catch(function(err) {
                req.flash('error', 'Photo upload error');
                res.redirect(302, '/photos/new');
            });
        }).catch(function(err) {
            req.flash('error', err);
            res.redirect(302, '/photos/new');
        });
    }
};
