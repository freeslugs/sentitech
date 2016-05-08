'use strict';

var _pos = require('pos');

var _pos2 = _interopRequireDefault(_pos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.post('/api', function (req, res) {
  console.log(req.body);
  res.send(req.body);
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
