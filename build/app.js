"use strict";

var _pos = require("pos");

var _pos2 = _interopRequireDefault(_pos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var words = new _pos2.default.Lexer().lex('You have an ugly car.');
var tagger = new _pos2.default.Tagger();
var taggedWords = tagger.tag(words);
for (var i in taggedWords) {
  var taggedWord = taggedWords[i];
  var word = taggedWord[0];
  var tag = taggedWord[1];
  console.log(word + " /" + tag);
}

// http://thesaurus.altervista.org/thesaurus/v1?key=P5pYnEz4HEUnBIF2BmnI&word=good&language=en_US&output=json
// https://tone-analyzer-demo.mybluemix.net/

// RB
// RBR
// RBS
// JJ
// JJR
// JJS
