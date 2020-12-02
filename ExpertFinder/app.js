//create express instance
const express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var exphbs = require('express-handlebars');
var path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4001;
app.use(express.static(__dirname + '/public'));


app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Database connection


const { initDB } = require('./models/db.js');
global.db = initDB();

app.use(cookieParser());
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
// app.use(express.static(path.join(__dirname + 'public')));
//app.use(express.static('public'));


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


// Starting Page
app.get('/',function(req,res){
  res.render('index') 
});

// About Page
app.get('/about.html',function(req,res){
  res.render('about') 
});

// add-new-expert Page
app.get('/add-new-expert.html',function(req,res){
  res.render('add-new-expert') 
});


// edit Page
app.get('/edit.html',function(req,res){
  res.render('edit') 
});

// index Page
app.get('/index.html',function(req,res){
  res.render('index') 
});

// login Page
app.get('/login.html',function(req,res){
  res.render('login') 
});

// mentor-profile Page
app.get('/mentor-profile.html',function(req,res){
  res.render('mentor-profile') 
});

// register Page
app.get('/register.html',function(req,res){
  res.render('register') 
});

// result-list Page
app.get('/result-list.html',function(req,res){
  res.render('result-list') 
});





//Accounts
const queriesRouter = require('./models/queries.js');

app.use('/queries', queriesRouter);


// User Login Router
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
app.use(function(req, res){
  res.status(404);
  res.render('404');
});



//start server
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});