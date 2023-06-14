const mysql = require('mysql2');
const mysqlConfig = require('../config/mysql');
const pool = mysql.createPool(mysqlConfig);

const getDate = (d) => `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
const getTime = (d) => `${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;
const getDateTime = (d) => getDate(d) + ' ' + getTime(d);

const signInProcess = (req, res)=>{
  let sql = `SELECT id, nick FROM users WHERE id=? and pw=?`;
  let values = [req.body.email, req.body.password];
  pool.query(sql, values, (err, rows, field)=>{
    if (err) throw err;
    if (rows.length>0){
      req.session.user = {id : rows[0].id, nick : rows[0].nick};
      res.render('index.html', {user : req.session.user});
    } else {
      res.render('auth/signIn.html', {msg : "아이디나 비밀번호가 일치하지 않습니다."});
    }
  })
}

const signUpProcess = (req, res)=>{
  pool.query(`SELECT id FROM users WHERE id='${req.body.email}'`, (err, rows, field)=>{
    if (err) throw err;
    if(rows.length > 0)
      return res.render('auth/signUp.html', { msg : '이미 존재하는 이메일입니다.'})
    
    let sql = "INSERT INTO users (id, nick, pw, joinDate, lastLogin, tier) VALUES (?, ?, ?, ?, ?, ?)";
    let values = [req.body.email, req.body.nick, req.body.password, 
                  getDateTime(new Date()), getDateTime(new Date()), "마스터"];
    pool.query(sql, values, (err, field)=>{
      if (err) throw err;
      res.render('auth/signIn.html');
    })
  })
}

const signOut = (req, res)=>{
  req.session.destroy();
  res.render('index.html');
}

module.exports = {
  signInProcess,
  signUpProcess,
  signOut,
}