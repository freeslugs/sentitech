import pos from "pos" 

var express = require('express');
var cors = require('cors');
var app = express();

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(cors());

app.get('/', function(req, res) {
  res.send('hello world');
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