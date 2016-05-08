import pos from "pos" 

var AlchemyAPI = require('../alchemyapi');
var alchemyapi = new AlchemyAPI(process.env.ALCHEMY_KEY);

function getSentiment(text, callback) {
  alchemyapi.sentiment("text", text, {}, function(response) {
    callback(response["docSentiment"]["score"]);
  });
}

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

app.use(cors());

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api', function(req, res) {
  getSentiment(req.body.text, function(score) {
    res.send(score);
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Node app is running on port', port);
});

// var words = new pos.Lexer().lex('You have an ugly car.');
// var tagger = new pos.Tagger();
// var taggedWords = tagger.tag(words);
// for (var i in taggedWords) {
//   var taggedWord = taggedWords[i];
//   var word = taggedWord[0];
//   var tag = taggedWord[1];
//   console.log(word + " /" + tag);
// }


// https://tone-analyzer-demo.mybluemix.net/

// RB 
// RBR
// RBS
// JJ
// JJR
// JJS