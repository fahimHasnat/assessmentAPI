const path = require("path");

const express = require('express');
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();

///Middleware
app.use(bodyParser.json({ limit: '100mb' }));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, responseType'
    );
    next();
});

let survey = [
    {
        "question": "How are you ?",
        "type": "multiple choice",
        "options": "Very Good, Good, Neutral, Bad, Very Bad",
        "required": true
    },
    {
        "question": "Where do you live ?",
        "type": "text",
        "options": "",
        "required": true
    },
    {
        "question": "How frequent you use our product ?",
        "type": "dropdown",
        "options": "Very often, often, Moderate, Not much, Never used",
        "required": true
    },
    {
        "question": "Do you like our product ?",
        "type": "Checkbox",
        "options": "Yes, No",
        "required": true
    },
    {
        "question": "Your contact number ?",
        "type": "number",
        "options": "",
        "required": false
    }
]

function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

app.get('/getSurvey', function (req, res) {
    res.json(shuffle(survey));
});

app.get('/', function (req, res) {
    res.json("This an API for serving example JSON responses");
});


///Error Handler
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

app.listen(process.env.PORT, () => {
    console.log(`The server is running on port ${process.env.PORT}`);
});