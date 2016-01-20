/**
 * Created by user on 1/20/16.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var api = require('./routes/api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(express.static('server/public'));

app.use('/api', api);

app.get('/', function(request, response){
   response.sendFile(__dirname + '/public/views/index.html');
});



var server = app.listen(3000, function(){
   var port = server.address().port;
    console.log("Listening at port:", port);
});
