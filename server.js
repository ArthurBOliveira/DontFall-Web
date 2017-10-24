require('./config/config');

const express = require('express');
const passport = require('passport');
const flash = require('connect-flash');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

let {mongoose} = require('./server/db/mongoose');

let app = express();
let port = process.env.PORT;

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(session({
    secret: 'dontfall-web-session-secret',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(flash()); // use connect-flash for flash messages stored in session

app.set('view engine', 'ejs'); // set up ejs for templating

require('./server/routes.js')(app, passport);
require('./config/passport')(passport); // pass passport for configuration

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});