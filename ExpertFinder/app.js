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
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
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
app.get('/', function (req, res) {
  res.render('index', {
    javascript: '<script src="js/HomeSearch.js"></script>',
    userName: req.session.username,
    userID: req.session.ID
  })
});

// About Page
app.get('/about.html', function (req, res) {
  res.render('about', {
    userName: req.session.username,
    userID: req.session.ID
  })
});

// add-new-expert Page
app.get('/add-new-expert.html', function (req, res) {
  res.render('add-new-expert', {
    userName: req.session.username,
    userID: req.session.ID
  })
});


// edit Page
app.get('/edit.html', function (req, res) {
  res.render('edit', {
    javascript: '<script src="js/edit.js"></script>',
    userName: req.session.username,
    userID: req.session.ID
  })
});

// index Page
app.get('/index.html', function (req, res) {
  res.render('index', {
    javascript: '<script src="js/HomeSearch.js"></script>',
    userName: req.session.username,
    userID: req.session.ID
  })
});

// login Page
app.get('/login.html', function (req, res) {
  res.render('login', {
    userName: req.session.username,
    userID: req.session.ID
  })
});

// mentor-profile Page
app.get('/mentor-profile.html', function (req, res) {
  res.render('mentor-profile', {
    javascript: '<script src="js/MentorProfile.js"></script>',
    userName: req.session.username,
    userID: req.session.ID
  })
});

// register Page
app.get('/register.html', function (req, res) {
  res.render('register', {
    javascript: '<script src="js/register.js"></script>',
    userName: req.session.username,
    userID: req.session.ID
  })
});

// result-list Page
app.get('/result-list.html', function (req, res) {
  res.render('result-list', {
    javascript: '<script src="js/SearchFunctionality.js"></script>',
    userName: req.session.username,
    userID: req.session.ID
  })
});

app.get('/register-success.html', function (req, res) {
  res.render('register-success', {
    userName: req.session.username,
    userID: req.session.ID
  })
});

app.get('/approve-profile.html', function (req, res) {
  res.render('approve-profile', {
    userName: req.session.username,
    userID: req.session.ID
  })
});

app.get('/decline-profile.html', function (req, res) {
  res.render('decline-profile', {
    userName: req.session.username,
    userID: req.session.ID
  })
});

// confirm-profile Page
app.get('/confirm-profile', function (req, res) {
  let email = req.query.email;
  let sql = 'select * from user_info where email = ?'

  db.get(sql, email, (err, data) => {
    if (err) {
      res.status(500).json({ "error": err.message });
    } else {
      var context = {
        results: data,
        javascript: '<script src="js/confirmationScript.js"></script>',
        userName: req.session.username,
        userID: req.session.ID
      };
      console.log(context.results)


      res.render('confirm-profile', context)
    }
  })
  
  
  
  
  

});


//Accounts
const queriesRouter = require('./models/queries.js');

app.use('/queries', queriesRouter);


// User Login Router
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
        res.render('login', {
          loginMessage: '<script>alert("Welcome!");</script>',
          userName: username,
          userID: sessID
        });

      } else {
        console.log('No username and password match found');
        res.render('login', { loginMessage: '<script>alert("Incorrect Username and/or Password.");</script>' });
      }

    })
  } else {
    console.log('Username and/or password not entered');
    res.render('login', { loginMessage: '<script>alert("Enter a username and password.");</script>' });
  }
});

// Logout Router
app.get('/logout.html',(req,res) => {
  req.session.destroy(function (err) {
    res.render('logout');
   });
})


// Get sessionID json
app.get('/sessionID', (req, res) => {
  res.json({ sessID: req.session.ID });
});


// Send Email Confirmation after Registration.
const emailRouter = require('./models/emailConfirmRoute.js');
app.use(emailRouter);



// 404 Error Page
app.use(function (req, res) {
  res.status(404);
  res.render('404');
});



//start server
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});