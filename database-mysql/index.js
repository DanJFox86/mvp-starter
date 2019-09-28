var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'refrigeratorducer'
});

var selectAll = function(callback) {
  connection.query('SELECT * FROM ingredients', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var selectBasics = function(callback) {
  connection.query('SELECT ingredients.name, ingredients.id FROM basics, ingredients where basics.ingredient_id = ingredients.id;', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = { selectAll,
                   selectBasics,
                   connection
};
