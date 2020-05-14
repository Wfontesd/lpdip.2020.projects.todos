'use strict';
const express = require(`express`);
const connection = require(`./database.js`);
const todosApi = express.Router();

todosApi.get('/', (req, res) => {
    connection.query(
      'SELECT * FROM todos',
      function(err, results) {
        if (err) {
          throw error;
        } else {
          results.forEach(row => {
            row.isDone === 0 ? row.isDone = false : row.isDone = true;
        });
        res.json(results);
        }
      });
});

todosApi.post('/', (req, res) => {
  connection.query(
    'INSERT INTO todos (label,idList,isDone) VALUES (?,?,?)',
    [req.body.label,req.body.idList,false],
    function(err, results) {
      if (err) {
        throw error;
      } else {
        req.body.id = results.insertId;
        res.json(req.body);
      }
    });
});

todosApi.put('/:id', (req, res) => {
  connection.query(
    'UPDATE todos SET label = ? ,idList = ?, isDone = ? WHERE id = ?',
    [req.body.label,req.body.idList,req.body.isDone,req.params.id],
    function(err, results) {
      if (err) {
        throw error;
      } else {
        res.json(req.body);
      }
    });
});

todosApi.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM todos WHERE id = ?',
    [req.params.id],
    function(err, results) {
      if (err) {
        throw error;
      } else {
        res.json(results);
      }
    });
});
module.exports = todosApi;
