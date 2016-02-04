var express = require('express');
var path = require('path');
var app = express();

var users = []
var games = []


app.use(express.static(path.join(__dirname,'public')));

app.post('/register/:join_mode/:create_mode', function (req,res){
    var user = req.name;
    var join_mode = req.params.join_mode;
    var create_mode = req.params.create_mode;
    console.log("join_mode : "+join_mode)
    console.log("create_mode : "+create_mode)
    users.push({'name':user});
    return res.json({'id':users.length-1})
    // to register a guy to the game
})
app.get('/',function (req, res){
    //res.json({name:"suhas"});
    // sending the client side html files
    return res.sendFile('index.html');
})

app.get('/games', function (req, res){
    // return running games
    return res.json(games);
})

app.get('/create', function (req, res){
    // create a game room
    games.push({})
    return res.json({'number':games.length-1})
})

app.get('/join/:name/:id', function (req, res){
    var id = req.params.id
    var name = req.params.name
    games[id].player = name;
    games[id].score = 0;
    return res.json({'game' : games[id]})

})

app.get('/game/:id/update/:pi', function (req, res){
    // receive update
    var id = req.params.id
    var data = req.params.pi
    console.log(data);
    var random_num = Math.floor((Math.random()*6) + 1);
    if(data==random_num){
        return res.json({'flag':"OUT", 'score':games[id].score})
    }
    games[id].score+=Number(data);
    return res.json({'flag':"NOT OUT", 'score':games[id].score})
})


app.get('/reset/:id',function(req,res){
	var id = req.params.id;
	games[id].score = 0;
	console.log('reset');
	return res.json({'flag':false,'score':games[id].score})
})
var server = require('http').createServer(app).listen(process.env.PORT || 9000);
