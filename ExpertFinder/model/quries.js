const e = require("express");
const express = require("express")

queriesRouter = express.Router();


// Account get 
queriesRouter.get('/account', (req,res,next)=>{
    let username = req.query.username;
    let password = req.query.password;
    let accountid = req.query.accountid;
    let values = []
    let sql  = 'select username, id, accountactive from account_info '
    if((password != null) && (username != null)){
      sql += 'where username = ?'
      sql += 'and userpassword = ?'
      values.push(username);
      values.push(password);
    }else if((accountid != null)){
      sql += 'where id = ?'
      values.push(accountid);
    }
    db.all(sql,values,(err,rows)=>{
      if(err){
        res.status(500).json({"error": err.message});
      }else{
          res.status(200).json({accounts: rows});
      }
    });
  });


//account post  
queriesRouter.post('/account', (req,res,next)=>{
    let username = req.body.username;
    let userpassword = req.body.userpassword;
    let accountactive = false;
  
  
  
    var sql = "INSERT INTO account_info(username, userpassword, accountactive) "
    sql += "VALUES(?,?,?) "
  
    if((userpassword != null) && (username != null)){
      db.run(sql,[username,userpassword,accountactive], (err)=>{
        if(err){
          res.status(500).json({"error": err.message});
        }else{
          res.status(201).send("Account Created");
        }
      });
    }else{
      res.status(500).send("account creation failed")
    }
  });

  //account put 
  
queriesRouter.put('/account/activate', (req,res,next)=>{
    let accountid = req.body.accountid;
  
  
    var sql = 'Update account_info set accountactive = true '
    sql += 'where id = ?'
  
    if((accountid != null)){
      db.run(sql,[accountid], (err)=>{
        if(err){
          res.status(500).json({"error": err.message});
        }else{
          res.status(201).send("Account updated");
        }
      });
    }else{
      res.status(500).send("account update failed")
    }
  
  });


  //account delete 
  
queriesRouter.delete('/account', (req,res,next)=>{
    let accountid = req.query.accountid;
  
    sql = 'DELETE FROM account_info '
    sql += 'where id = ?'
  
    console.log(accountid);
  
    db.run(sql,accountid, (err) =>{
  
      if (err) {
        return console.error(err.message);
      }
      res.status(500).send(`Row(s) deleted ${this.changes}`);
  
    });
  
  });


// user get
  queriesRouter.get('/user', (req,res,next)=>{
    let accountid = req.query.accountid;
  
    let sql = 'select userid as accountid, fname, lname, phone, email, linkedin, github, twitter from user_info '
    sql += 'where userid = ?'
  
    db.get(sql,accountid,(err,rows)=>{
      if(err){
        res.status(500).json({"error": err.message});
      }else{
          res.status(200).json(rows);
      }
    });
  
  });