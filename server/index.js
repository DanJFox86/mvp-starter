var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mysql');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/ingredients', (req, res) => {
  db.selectAll((err, ingredients) => {
    if(err) {
      res.sendStatus(500);
    } else {
      let data = {};
      data.all = ingredients;
      data.selected = {};
      res.json(data);
    }
  });
});

app.get('/basics', (req, res) => {
  db.selectBasics((err, data) => {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/getRecipes', (req, res) => {
  console.log(`Received ${req.method} request from ${req.url}`);
  let { ingredientIds } = req.body;
  if (ingredientIds.length > 0) {
    db.findRecipes(ingredientIds, (err, data) => {
      if(err) {
        res.sendStatus(500);
      } else {
        console.log('sending info', data)
        res.json(data);
      }
    });
  } else {
    res.send({ recipes: [],
                   all: [],
                  most: [],
                  some: []
    });
  }
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

