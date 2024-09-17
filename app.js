const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// middleware stuff
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// array to store posts
let posts = [];

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

app.post('/', (req, res) => {
  const { title, author, content } = req.body;
  const newPost = { id: Date.now(), title, author, content, date: new Date().toLocaleString() };
  posts.push(newPost);
  res.redirect('/');
});

app.post('/edit/:id', (req, res) => {
  const { title, author, content } = req.body;
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    post.title = title;
    post.author = author;
    post.content = content;
    post.date = new Date().toLocaleString();
  }
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect('/');
});

app.get('/', (req, res) => {
  res.render('index', { posts });
});

app.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    res.render('edit', { post });
  } else {
    res.redirect('/');
  }
});

app.get('/new', (req, res) => {
  res.render('new');
});