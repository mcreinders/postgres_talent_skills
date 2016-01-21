/**
 * Created by user on 1/20/16.
 */
var express = require('express');
var router = express.Router();
var pg = require('pg');
var bodyParser = require('body-parser');

var connectionString = 'postgres://localhost:5432/talent_skills';

router.post('/addSkills', function(request, response){
   var skillsList = [];

    var data = {text: request.body.skills};

    pg.connect(connectionString, function(err, client){
        client.query("INSERT INTO skills(name) values($1)", [data.text]);

     var query = client.query("SELECT * FROM skills ORDER BY id ASC");

        query.on('row', function(row) {
            skillsList.push(row);
        });


    query.on('end', function(){
       client.end();
        return response.json(skillsList);

    });

    });
});

/////// code I added later //////////
router.get('/getSkills', function(request, response){
    var skillsList = [];
    pg.connect(connectionString, function(err, client) {

        var query = client.query("SELECT * FROM skills ORDER BY id ASC");

        query.on('row', function(row) {
            skillsList.push(row);
        });

        query.on('end', function () {
            client.end();
            return response.json(skillsList);
        });
    });
});
////////////////////////////////////

module.exports = router;