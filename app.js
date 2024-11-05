var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/@fortawesome')))

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// New routes for other pages
app.get('/about', (req, res) => res.render('about', { title: 'About' }));
app.get('/contact', (req, res) => res.render('contact', { title: 'Contact Me' }));
app.get('/projects', (req, res) => res.render('project', { title: 'My Projects' }));

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;

