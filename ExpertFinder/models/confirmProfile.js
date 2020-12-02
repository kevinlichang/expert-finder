var express = require("express");

const { initDB } = require('./db.js');
let db = initDB();



confirmPageRouter = express.Router();

confirmPageRouter.get('/confirm-profile', function(req, res) {
  let email = req.query.email;

  
  let sql = 'select * from user_info where email = ?'
  
  db.get(sql, email, (err, rows) => {
    if (err) {
      res.status(500).json({ "error": err.message });
    } else {
      console.log(rows)
    }
  })



  res.render('confirm-profile');


});

module.exports = confirmPageRouter