"use strict";

var _pos = require("pos");

var _pos2 = _interopRequireDefault(_pos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AlchemyAPI = require('../alchemyapi');
var alchemyapi = new AlchemyAPI(process.env.ALCHEMY_KEY);

function getSentiment(text, callback) {
  alchemyapi.sentiment("text", text, {}, function (response) {
    callback(response["docSentiment"]["score"]);
  });
}

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/getsentiment', function (req, res) {
  getSentiment(req.body.text, function (score) {
    res.send(score);
  });
});

app.post('/api/sentimentize', function (req, res) {
  // req.body.text
  // req.body.sentiment //=> postive or negative
  // res.send(score);
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
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
