var express = require('express');
var path = require('path');
var app = express();

var users = []
var games = []


app.use(express.static(path.join(__dirname,'public')));


app.post('/register', function (req,res){
    var user = req.data.name;
    users.push({'name':user});
    return res.json({'name':user})
    // to register a guy to the game
})
app.get('/',function (req, res){
    //res.json({name:"suhas"});
    // sending the client side html files
    return res.sendFile('index.html');
})

app.get('/games', function (req, res){
    // return running games
    return res.json(game);
})

app.get('/create', function (req, res){
    // create a game room
    game.push({})
    return res.json({'number':game.length-1})
})

app.get('/join/:name/:id', function (req, res){
    var id = req.params.id
    var name = req.params.name
    game[id].player = name;
    game[id].score = 0;
    return res.json({'game' : game[id]})

})

app.post('/game/:id/update', function (req, res){
    // receive update
    var data = req.data.pi;
    var id = req.params.id
    console.log(data);
    if(data==3){
        return res.json({'flag':"out", 'score':game[id].score})
    }
    game[id].score+=data
    return res.json({'flag':"notout", 'score':game[id].score})
})

var server = require('http').createServer(app).listen(process.env.PORT || 9000);
