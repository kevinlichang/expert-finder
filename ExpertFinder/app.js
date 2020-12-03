//create express instance
const express = require('express');
//var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4001;


//Database connection


const { initDB } = require('./models/db.js');
global.db = initDB();

//app.use(cookieParser());
app.use(session({
  secret: 'mySuperDuperSecret789BlahBlah',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true,
})
)
app.use(express.static(__dirname + '/'));


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


// // Starting Page
// app.get('/', (req, res) => {  
//   console.log('Hi this is a test');
//   res.sendFile(path.join(__dirname + '/index.html'));  

// });


// ///test db connection and server connection, Should now only load if index.html isn't found
// app.get('/', (req, res, next) => {
//   res.send('Hello World!')
// });



//Accounts
const queriesRouter = require('./models/queries.js');

app.use('/queries', queriesRouter);


// Login
var sessID;
app.post('/login', (req, res) => {
  let username = req.body.username;
  let userpassword = req.body.userpassword;
  let sql = 'select * from account_info where username= ? and userpassword = ?'

  if (username && userpassword) {    
    db.all(sql, [username, userpassword], (err, rows) => {
      if (rows.length > 0) {
        req.session.loggedin = true;
        req.session.username = username;

        // Store the userID from the current matching row as the session ID
        req.session.ID = rows[0].id        
        console.log('Username and Password match found');   
        console.log(req.cookies);
        console.log('Current userID is: ' + req.session.ID);   
        sessID = req.session.ID;          
                
      } else {
        console.log('No username and password match found');
        res.send('Incorrect Username and/or Password.');
      }
      
    })
  } else {
    console.log('Username and/or password not entered');
    res.send('Please enter Username and Password.');    
  }
});

// Get sessionID json
app.get('/sessionID', (req, res) => {
  res.json({sessID: req.session.ID});  
});




// Send Email Confirmation after Registration.
const emailRouter = require('./models/emailConfirmRoute.js');
app.use(emailRouter);

// Confirm Profile Page after registration
const confirmPageRouter = require('./models/confirmProfile.js');
app.use(confirmPageRouter);


// 404 Error Page
app.use((req, res) =>{
  res.sendFile(path.join(__dirname + '/404.html'));
})



//start server
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});