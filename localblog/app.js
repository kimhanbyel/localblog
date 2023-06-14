const express = require('express');
const session = require('express-session');
const authRouter = require('./routes/auth');
const myBlogRouter = require('./routes/myBlog');
const blogRouter = require('./routes/blog');
const sessionConfig = require('./config/session');
const nunjucks = require('nunjucks');
const path = require('path');
const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
})

app.use('/static/', express.static(path.join(__dirname, 'images')));
app.use(session(sessionConfig));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => res.render('index.html', {user : req.session.user }));
app.use('/auth', authRouter);
app.use('/myPage', myBlogRouter);
app.use('/blog', blogRouter);
app.listen(3000);