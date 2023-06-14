const mysql = require('mysql2');
const mysqlConfig = require('../config/mysql');
const pool = mysql.createPool(mysqlConfig);

const getDate = (d) => `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
const getTime = (d) => `${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;
const getDateTime = (d) => getDate(d) + ' ' + getTime(d);

const list = (req, res)=>{
  let sql = `SELECT idproducts, name, price, quantity, DATE_FORMAT(registrationDate, '%Y-%m-%d') AS date, seller From products`;
  pool.query(sql, (err, rows, field)=>{
    res.render('postList.html', { posts : rows, user : req.session.user});
  })  
}

const registration = (req, res)=>{
  if(req.session.user == undefined)
    res.render('message.html', {message : "로그인 하세요"});
  else 
    res.render('productRegistration.html', {user : req.session.user});
}

const registrationProcess = (req, res)=>{
  if(req.session.user == undefined)
    res.render('message.html', {message : "로그인 하세요"});
  else {
    let sql = 'INSERT INTO products (category, name, price, quantity, registrationDate, img, seller) ';
        sql += 'VALUES(?, ?, ?, ?, ?, ?, ?)';
    let values = [req.body.productCategory, req.body.productName, req.body.productPrice, req.body.productQuantity,
                  getDateTime(new Date()), req.file.filename, req.session.user.id];
    pool.query(sql, values, (err, rows, field)=>{
      if(err) throw err;
        res.render("message.html", {message : "상품이 정상적으로 등록되었습니다."}) 
    })
  }
}

const productNum = (req, res)=>{
  let sql = "SELECT * FROM products WHERE idproducts=?";
  let values = [req.params.productNum];
  pool.query(sql, values, (err, rows, field)=>{
    if(err) throw err;
    res.render('productNum.html', {product : rows[0], user : req.session.user});
  })
}

const productClass = (req, res)=>{
  let sql = `SELECT idproducts, name, price, DATE_FORMAT(registrationDate, '%Y-%m-%d') AS date, seller From products WHERE category=?`;
  let values = [req.params.productClass];
  pool.query(sql, values, (err, rows, field)=>{
    res.render('productsList.html', { products: rows, user : req.session.user});
  })    
}

module.exports =  {
  list,
  registration,
  registrationProcess,
  productNum,
  productClass,
}
