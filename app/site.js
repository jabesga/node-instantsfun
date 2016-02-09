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
    },

    import_csv : function(req, res){
        var fs = require('fs');
        var parse = require('csv-parse');
    
        var parser = parse({delimiter: ','}, function(err, data){
            var sounds_list = [];
            data.filter(function(element){
                var sound = new Sounds({
                    'name': element[0],
                    'color': element[1],
                    'category': element[2],
                    'url': element[3],
                });
                sounds_list.push(sound);
            });

            Sounds.create(sounds_list, function(err, inserted){
                if(err){
                    throw err;
                    console.log(err);
                }
                else{
                    res.redirect('/');
                }
            });

        });

        fs.createReadStream('./scraping/scraped_database.csv').pipe(parser);
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
