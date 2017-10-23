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
app.use(bodyParser()); // get information from html forms
app.use(session({ secret: 'node-account-manager-session-secret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.set('view engine', 'ejs'); // set up ejs for templating

require('./server/routes.js')(app, passport);
require('./config/passport')(passport); // pass passport for configuration

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});