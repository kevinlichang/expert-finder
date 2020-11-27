//create express instance
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4001;


//Database connection


const { initDB } = require('./models/db.js');
global.db = initDB();
  
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

// load queries
const getAccount = (req, res) => {
  var sql = 'select * from account_info'
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err
    }
    response.status(201).json(rows)
  })
}




///test db connection and server connection
app.get('/', (req, res, next) => {
    res.send('Hello World!')
  });





//Accounts
const queriesRouter = require('./models/queries.js');
app.use('/queries',queriesRouter);


//Send Email Confirmation after Registration.
//const emailRouter = require('./models/emailConfirmRoute.js');
//app.use('/send-email-confirm',emailRouter);



//start server
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });