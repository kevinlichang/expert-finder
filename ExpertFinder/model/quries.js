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