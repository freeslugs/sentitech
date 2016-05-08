import pos from "pos" 
var request = require('request');

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

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/getsentiment', function(req, res) {
  getSentiment(req.body.text, function(score) {
    res.send(score);
  });
});

app.post('/api/sentimentize', function(req, res) {
  var text = req.body.text;
  var sentiment = req.body.sentiment;
  var words = getAdjectives(text);
  Promise.all(words.map(function (word) {
    return getMinMax(word, sentiment).then(function(newTerm) {
      text = text.replace(word, newTerm.term);
    });
  })).then(function() {
    console.log(text);
    res.send(text);
  });
});

// var text = "you did a decent job today! you are a pretty person";
// var sentiment = 1;
// var words = getAdjectives(text);
// Promise.all(words.map(function (word) {
//   return getMinMax(word, sentiment).then(function(newTerm) {
//     text = text.replace(word, newTerm.term);
//     console.log(text);
//   });
// })).then(function() {
//   console.log(text);
// })

function getAdjectives(text) {
  var words = new pos.Lexer().lex(text);
  var tagger = new pos.Tagger();
  var taggedWords = tagger.tag(words);
  var adjectives = [];
  for (var i in taggedWords) {
    var taggedWord = taggedWords[i];
    if(taggedWord[1] == "JJ" || taggedWord[1] == "RB") {
      var word = taggedWord[0];  
      // var tag = taggedWord[1];
      // console.log(word + " /" + tag);
      adjectives.push(word);
    }
  }
  return adjectives;
}

// var port = process.env.PORT || 3000;
// app.listen(port, function() {
//   console.log('Node app is running on port', port);
// });



function getMinMax(word, sentiment) {
  return new Promise(function(resolvea,rejecta) {
    getSynonyms(word, function(synonyms) {
      var wordScores = [];
      Promise.all(synonyms.map(function (term) {
        return new Promise(function(resolve,reject) {
          getSentiment(term, function(score) {
            wordScores.push({term: term, score: score});
            resolve();
          });  
        });
      })).then(function() {
        // console.log(wordScores);
        wordScores.sort(function (a, b) {
          return a.score - b.score
        });

        var min = wordScores[0], max = wordScores[wordScores.length - 1];
        if(sentiment) {
          resolvea(max);
        } else {
          resolvea(min);
        }
      });  
    });
  });
}


function getSynonyms(word, callback) {
  var url = `http://thesaurus.altervista.org/thesaurus/v1?key=${process.env.THESAURUS_KEY}&word=${word}&language=en_US&output=json`;
  request(url, function (error, response, body) {
    var body = JSON.parse(body);
    var data = body.response[0].list.synonyms;
    var synonyms = data.split("|").map(function (term) {
      return term.split(" ")[0];
    });
    callback(synonyms);
  })
}


// https://tone-analyzer-demo.mybluemix.net/

// RB 
// RBR
// RBS
// JJ
// JJR
// JJS