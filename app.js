import pos from "pos" 

var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

var words = new pos.Lexer().lex('You have an ugly car.');
var tagger = new pos.Tagger();
var taggedWords = tagger.tag(words);
for (var i in taggedWords) {
  var taggedWord = taggedWords[i];
  var word = taggedWord[0];
  var tag = taggedWord[1];
  console.log(word + " /" + tag);
}


// https://tone-analyzer-demo.mybluemix.net/

// RB 
// RBR
// RBS
// JJ
// JJR
// JJS