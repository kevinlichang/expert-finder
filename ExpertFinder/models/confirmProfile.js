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


  var options = {
    root: process.cwd()
  };
  res.sendFile('/confirm-profile.html', options, function (err) {
    if (err) {
        console.log('Error in res : %s, status code: %s', err, res.statusCode);      
        res.status(err.status).end();
    }
    else {
        console.log('Sent: ', 'confirm-profile.html');
      }
  });


});

module.exports = confirmPageRouter