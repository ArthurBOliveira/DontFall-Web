const path = require('path');
const http = require('http');
const express = require('express');

let {passport} = require('./config/passport.js');

const publicPath = path.join(__dirname, '../views');
const port = process.env.PORT || 3000;

// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

require('./server/routes.js')(app, passport);

app.listen(port, () => {
    console.log('On port: ' + port);
});