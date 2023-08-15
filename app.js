const express = require("express");
const axios = require('axios').default;
const session = require('express-session');
const { authenticate, checkSession } = require('./middleware/user-auth');
const dbConnection = require("./config/db-config");
const bodyParser = require('body-parser');
const { WebSocketServer } = require("ws");
const wssApp = new WebSocketServer({ port: 8080, path: "/controls" });
const wssPi = new WebSocketServer({ port: 8081, path: '/raspi' });
const app = express();
const db = new dbConnection();


app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(session({
    secret: 'secret',
    maxAge: 60 * 60 * 1000,
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
db.connect();


app.get("/login", (req, res) => {
    res.render('login');
});

app.post("/login", authenticate, (req, res) => {
    res.redirect('/home');
});

app.get('/home', checkSession, (req, res) => {
    res.render('home');
})



wssApp.on('connection', function connection(wsApp) {
    wsApp.on('error', console.error);

    wsApp.on('message', async function message(data) {
        const dataToSend = {
            "cmd": data.toString()
        }
        try {
            const response = await axios.post('http://192.168.1.12:8080/controls', dataToSend);
            console.log(response);
        } catch (err) {
            console.error(err);
        }
    })
});

app.listen(3000);