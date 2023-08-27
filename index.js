const express = require('express');
const app = express();
const expressLayouts = require("express-ejs-layouts");
const port = 8000;
const db = require("./config/mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const customMiddleware = require("./config/middelware");
const MongoStore = require("connect-mongodb-session")(session);
const bcrypt = require('bcrypt');


//Passport
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportGoogle =  require("./config/passport-google-ouath2-strategy");

//Session
app.use(
    session({
        name: "autentication",
        secret: 'scret_key_sample',
        saveUninitialized: true,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 1000,
        },
        store: new MongoStore(
            {
                uri: "mongodb://localhost:27017/Autentication",
                autoRemove: "disabled",
            },
            function (err) {
                console.log(err || "connect-mongodb setup ok");
            }
        ),
    })
);

app.use(flash());
app.use(customMiddleware.setFlash);

//Layouts
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

//Template Engine
app.set("view engine", "ejs");
app.set("views", "./views");


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//Router
app.use('/', require('./routes'));

//Server
app.listen(port, () => {
    console.log(`Connected to the port ${port}`);
})