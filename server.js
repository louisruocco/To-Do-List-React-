const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const flash = require("connect-flash");
const app = express();

dotenv.config({path: "./.env"});

const sessionStore = new MongoDBStore({
    uri: process.env.DB_URI, 
    collection: process.env.DB_COLLECTION
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at ${port}`));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
    name: process.env.SESS_NAME, 
    secret: process.env.SECRET, 
    resave: false, 
    saveUninitialized: false, 
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 7
    }
}))