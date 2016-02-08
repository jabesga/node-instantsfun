var Sounds = require('./models/sound');

module.exports = {
    index : function(req, res, next) {
        var sounds_list = [];
        Sounds.find({}, null, {sort: {'name': 1}}, function(err, all_sounds){
            all_sounds.filter(function(sound){
                sounds_list.push({'name': sound.name, 'color': sound.color, 'url': sound.url, 'category': sound.category});
            });

            data = {
                'sounds_list' : sounds_list
            }
            res.render('index', data);
        });
    },
    
    filter : function(req, res) {
        var sounds_list = [];
        Sounds.find({'category': req.params[0].replace(/\//g, '')}, null, {sort: {'name': 1}}, function(err, all_sounds){
            all_sounds.filter(function(sound){
                sounds_list.push({'name': sound.name, 'color': sound.color, 'url': sound.url, 'category': sound.category});
            });

            data = {
                'sounds_list' : sounds_list
            }
            res.render('index', data);
        });
    }
    /*
    error_development : function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send(err.stack);
    },

    error_production : function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    },

    not_found : function(req, res, next) {
        res.status(404).render('error');
        res.status(404).send('Sorry cant find that!');
    }
    */
}
