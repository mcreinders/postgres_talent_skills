/**
 * Created by user on 1/20/16.
 */
var express = require('express');
var router = express.Router();
var pg = require('pg');
var bodyParser = require('body-parser');

var connectionString = 'postgres://localhost:5432/talent_skills';

router.post('/addSkills', function(request, response){
   var talentList = [];

    var data = {text: request.body.skills};

    pg.connect(connectionString, function(err, client){
        client.query("INSERT INTO skills(name) values($1)", [data.text]);

     var query = client.query("SELECT * FROM skills ORDER BY id ASC");

        query.on('row', function(row) {
            talentList.push(row);
        });


    query.on('end', function(){
       client.end();
        return response.json(talentList);

    });

    });
});

module.exports = router;