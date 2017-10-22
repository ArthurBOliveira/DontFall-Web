const path = require('path');
const http = require('http');
const express = require('express');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
let server = http.createServer(app);

app.use(express.static(publicPath));

require('./server/routes.js')(app, passport);
// require('./config/passport')(passport); // pass passport for configuration

server.listen(port, () => {
    console.log('On port: ' + port);
});