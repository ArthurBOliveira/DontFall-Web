const path = require('path');
const http = require('http');
const express = require('express');

let {passport} = require('./config/passport.js');

const publicPath = path.join(__dirname, '../views');
const port = process.env.PORT || 3000;

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

let app = express();
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
let server = http.createServer(app);

app.use(express.static(publicPath));
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

require('./server/routes.js')(app, passport);
// require('./config/passport')(passport); // pass passport for configuration

server.listen(port, () => {
    console.log('On port: ' + port);
});