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

router.post('/addTalent', function(request, response){
    var talentList = [];

    var data = {lastname: request.body.last_name, firstname: request.body.first_name, phone: request.body.phone, lowrange: request.body.low_range, highrange: request.body.high_range};



    pg.connect(connectionString, function(err, client){
        client.query("INSERT INTO talent(last_name, first_name, phone, low_range, high_range) values($1, $2, $3, $4, $5)", [data.lastname, data.firstname, data.phone, data.lowrange, data.highrange]);

        var query = client.query("SELECT * FROM talent ORDER BY id ASC");

        query.on('row', function(row) {
            talentList.push(row);
        });


        //skills


        query.on('end', function(){
            client.end();
            var idForTalent = talentList.id[talentList.length -1];
            console.log(idForTalent);
            return response.json(talentList);

        });

    });
});

module.exports = router;