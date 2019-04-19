var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017';
var dbName = 'shaken_not_stirred';

/* GET users listing. */
router.get('/portfolio', function(req, res, next) {
    res.render('portfolio', {title: 'Portfolio'});
});


router.get('/portfolio/event/:id', function (req, res, next) {
    var eventId = req.params.id;
    var queryStr = JSON.parse('{"' + eventId + '": {"$exists": true}}');

    mongoClient.connect(url, function(err, client) {
        var db = client.db(dbName);
        var collection = db.collection('event');
        collection.find(queryStr).toArray(function (err, data) {
            if (err || data.length < 1){
                res.status(404);
                res.render('error');
            }else {
                res.render('event-template', data[0][eventId]);
            }
            client.close();
        });
    });


});

module.exports = router;
