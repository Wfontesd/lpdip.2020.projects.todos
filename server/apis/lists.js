'use strict';
const express = require(`express`);
const connection = require(`./database.js`);
const lists = express.Router();

lists.get('/', (req, res) => {
    connection.query(
      'SELECT * FROM todolists',
      function(err, results) {
        if (err) {
          throw error;
        } else {
          res.json(results);
        }
      });
});
lists.post('/', (req, res) => {
  connection.query(
    'INSERT INTO todolists (label,description) VALUES (?,?)',
    [req.body.label,req.body.description],
    function(err, results) {
      if (err) {
        throw error;
      } else {
        req.body.id = results.insertId;
        res.json(req.body);
      }
    });
});
lists.put('/:id', (req, res) => {
  connection.query(
    'UPDATE todolists SET label = ? ,description = ? WHERE id = ?',
    [req.body.label,req.body.description,req.params.id],
    function(err, results) {
      if (err) {
        throw error;
      } else {
        res.json(req.body);
      }
    });
});

module.exports = lists;
