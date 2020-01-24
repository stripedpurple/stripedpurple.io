let express = require('express');
let router = express.Router();
let mongoClient = require('mongodb').MongoClient;

let url = 'mongodb://localhost:27017';
let dbName = 'stripedpurple';
let db;

let dbClient = new mongoClient(url);

dbClient.connect(err => {
  if (err){
    consola.error(err);
    db = null;
  }
  db = dbClient.db(dbName)
});

/* HEALTH CHECK */
router.get('/health', function (req, res, next) {
  res.send(
    '<p>I am the stone that the builder refused</p>' +
    '<p>I am the visual, the inspiration</p>' +
    '<p>That made Lady sing the blues</p>' +
    '<br>' +
    '<p>I\'m the spark that makes your idea bright</p>' +
    '<p>The same spark that lights the dark</p>' +
    '<p>So that you can know your left from your right</p>' +
    '<br>' +
    '<p>I am the ballot in your box, the bullet in the gun</p>' +
    '<p>The inner glow that lets you know to call your brother son</p>' +
    '<p>The story that just begun, the promise of what\'s to come</p>' +
    '<p>And I\'mma remain a soldier till the war is won</p>'
  )
});


router.get('/photos/:id', function (req, res, next) {
  let eventId = req.params.id;
  let queryStr = JSON.parse('{"eventId": "' + eventId + '"}');



    let collection = db.collection('photo');
    collection.find(queryStr)
      .project({ _id: 0})
      .toArray(function (err, data) {
      if (err || data.length < 1){
        res.status(404);
        res.render('error');
        return
      }
      res.json(data);
      // client.close();
    });


});

module.exports = router;
