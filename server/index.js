var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mysql');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/ingredients', (req, res) => {
  console.log(`Received ${req.method} request from ${req.url}`);
  db.selectAll((err, ingredients) => {
    if(err) {
      res.sendStatus(500);
    } else {
      ingredients.selected = {};
      res.json(ingredients);
    }
  });
});

app.post('/addIngredient', (req, res) => {
  console.log(`Received ${req.method} request from ${req.url}`);
  let obj = req.body;
  console.log(req.body);
  db.addIngredient(req.body, (err, ingredients) => {
    if (err) {
      res.send({ err, message: err, ingredients });
    } else {
      res.send({ err: null,
             message: 'Successfully Added Ingredient', ingredients });
    }
  })
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
        res.json(data);
      }
    });
  } else {
    res.send({ list: {},
                   all: [],
                  most: [],
                  some: []
    });
  }
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

