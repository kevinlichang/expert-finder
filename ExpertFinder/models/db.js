const sqlite3 = require("sqlite3");

const DB_ADDR = ":memory:";

const users = [
    {
        username: "clarjohn@oregonstate.edu",
        userpassword: "password",
        accountactive: true,
        userid: 1,
        fname: "John",
        lname: "clarke",
        phone: "999999999",
        email: "clarjohn@oregonstate.edu",
        linkedin: "https://www.linkedin.com/in/jclarkew/",
        github: "https://github.com/clarjohn",
        twitter: "",
    },
    {
      username: "DoeJane@oregonstate.edu",
      userpassword: "123",
      accountactive: false,
      userid: 2,
      fname: "Jane",
      lname: "Doe",
      phone: "999999999",
      email: "DoeJane@oregonstate.edu",
      linkedin: "",
      github: "",
      twitter: "",
    },
];



dbSchema = `CREATE TABLE IF NOT EXISTS  account_info (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  userpassword TEXT,
  accountactive bool
);`




dbSchema_userInfo = `CREATE TABLE IF NOT EXISTS  user_info(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userid integer NOT NULL UNIQUE,
  fname text,
  lname text,
  phone text,
  email text,
  linkedin text,
  github text,
  twitter text
);`


dbSchema_tags = `CREATE TABLE IF NOT EXISTS  USER_TAGS(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userid integer NOT NULL,
  tag_type text,
  tag_name text,
  tag_description text,
  tag_show bool
);`





const initDB = () => {
    const db = new sqlite3.Database(DB_ADDR, function(err){
      if (err) {
        console.log(err)
        return
    }
    console.log('Connected to ' + DB_ADDR + ' database.')
    });

    db.serialize(() => {
        db.run(dbSchema);
        db.run(dbSchema_userInfo);
        db.run(dbSchema_tags);

        const insertStmt = db.prepare("INSERT INTO account_info(username,userpassword,accountactive) VALUES (?,?,?)");
        users.forEach(({ username, userpassword, accountactive}, i) => {
            insertStmt.run([username, userpassword, accountactive]);
        })
        insertStmt.finalize();

        const insertuser = db.prepare("INSERT INTO user_info(userid,fname,lname, phone, email, linkedin, github, twitter) VALUES (?,?,?,?,?,?,?,?)");
        users.forEach(({ userid,fname,lname, phone, email, linkedin, github, twitter}, i) => {
            insertuser.run([userid,fname,lname, phone, email, linkedin, github, twitter]);
        })
        insertuser.finalize();


    });
    return db;
};

module.exports = { initDB };
