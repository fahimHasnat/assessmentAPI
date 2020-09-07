const path = require("path");

const express = require('express');
const bodyParser = require("body-parser");
require('dotenv').config();
const { shuffle } = require('./util');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require("swagger-jsdoc");
const { swaggerDocument } = require("./swagger");
const app = express();

///Middleware
app.use(bodyParser.json({ limit: '100mb' }));

app.use('/public', express.static(path.join(__dirname, 'public')));

const swaggerDocs = swaggerJsDoc(swaggerDocument);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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

/**
 * @swagger
 * /getSurvey:
 *  get:
 *    description: Use to request survey
 *    responses:
 *      '200':
 *        description: A successful response
 */

app.get('/getSurvey', function (req, res) {
    res.json(shuffle(survey));
});

/**
 * @swagger
 * /customers:
 *    put:
 *      description: Use to return all customers
 *    parameters:
 *      - name: customer
 *        in: query
 *        description: Name of our customer
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '201':
 *        description: Successfully created user
 */

app.get('/', function (req, res) {
    res.json("This an API for serving example JSON responses");
});


let demoSurvey = {
    "name": "testSurvey",
    "version": 1.1,
    "survey_flow": {
        "questions": [
            {
                "id": 1,
                "question": "দয়া করে আপনার নাম বলুন",
                "type": "textInput",
                "options": null,
                "required": true
            },
            {
                "id": 2,
                "question": "দয়া করে আপনার ঠিকানা বলুন",
                "type": "textInput",
                "options": null,
                "required": false
            },
            {
                "id": 3,
                "question": "দয়া করে আপনার মোবাইল নম্বরটি বলুন",
                "type": "numberInput",
                "options": null,
                "required": false
            },
            {
                "id": 4,
                "question": "দয়া করে আপনার বয়স বলুন",
                "type": "dropdown",
                "options": ["18 to 20 years", "21 to 25 years", "26 to 30 years", "31 to 35 years", "36 to 40 years", "41 to 45 years", "46 to 50 years", "51 to 55 years", "55+ years"],
                "required": true
            },
            {
                "id": 5,
                "question": "দয়া করে আপনার পেশা বলুন",
                "type": "dropdown",
                "options": ["Service", "Student", "Business", "Puller", "Day labor", "Other"],
                "required": true
            },
            {
                "id": 6,
                "question": "আপনি প্রধানত কোন ব্র্যান্ডের সিগারেট ধূমপান করেন",
                "type": "dropdown+condition",
                "options": ["franchise", "SOB"],
                "franchaise": ['bnh_sf', 'bnh_bg', 'bnh_sw', 'bnh_p', 'jpgl', 'jpgl_sp', 'jpgl_sw', 'capstan', 'srft', 'star_next', 'royals_gold', 'royals_next', 'royals_ls', 'pilot', 'derby', 'derby_style', 'hollywood'],
                "SOB": ["marlboro advance", "Marlboro FF", "Marlboro Gold", "Navy", 'Sheikh FF', "Marise", "Castle", "Rally", "Real", "Winston Blue", "Winston Red", "LD", "Others"],
                "required": true
            },
            {
                "id": 7,
                "question": "আপনি কতদিন যাবত এই ব্র্যান্ডটি ধূমপান করছেন?",
                "type": "dropdown",
                "options": ['Less than 6 Months', '6 Months to 1 year', '1 year to 2 years', '2+ years'],
                "required": true
            },
            {
                "id": 8,
                "question": "আপনার দ্বিতীয় পছন্দের ব্র্যান্ড কোনটি ?",
                "type": "dropdown+condition",
                "options": ["franchise", "SOB"],
                "franchaise": ['bnh_sf', 'bnh_bg', 'bnh_sw', 'bnh_p', 'jpgl', 'jpgl_sp', 'jpgl_sw', 'capstan', 'srft', 'star_next', 'royals_gold', 'royals_next', 'royals_ls', 'pilot', 'derby', 'derby_style', 'hollywood'],
                "SOB": ["marlboro advance", "Marlboro FF", "Marlboro Gold", "Navy", 'Sheikh FF', "Marise", "Castle", "Rally", "Real", "Winston Blue", "Winston Red", "LD", "Others"],
                "required": true
            },
            {
                "id": 9,
                "question": "আপনি কতদিন যাবত এই ব্র্যান্ডটি ধূমপান করছেন? ?",
                "type": "dropdown",
                "options": ['Less than 6 Months', '6 Months to 1 year', '1 year to 2 years', '2+ years'],
                "required": true
            },
            {
                "id": 10,
                "question": "ভোক্তা কি পিটিআর(PTR) গ্রহণ করেছেন  ?",
                "type": "multipleChoice",
                "options": ["yes", "no"],
                "yes": "11",
                "no": "12",
                "required": true
            },
            {
                "id": 11,
                "question": "ভোক্তা কোন পিটিআর(PTR) গ্রহণ করেছেন?",
                "type": "multipleChoice",
                "options": ["Match Box", "Lighter"],
                "required": true
            },
            {
                "id": 12,
                "question": "ভোক্তা কি হাতঘড়ি পরেছেন ?",
                "type": "multipleChoice",
                "options": ["yes", "no"],
                "required": true
            },
            {
                "id": 13,
                "question": "ভোক্তা কি ধরনের জুতা পরিধান করেছেন ?",
                "type": "dropdown",
                "options": ["Shoes", "Sandals", "Slipper", "Barefoot"],
                "required": true
            },
            {
                "id": 14,
                "question": "প্রথমবারের মতো বাংলাদেশে আমরা আপনাদেরকে আমন্ত্রণ জানিয়েছিলাম জন প্লেয়ার সিরিজের প্যাক ডিজাইন করার জন্য । আপনি কি এই রিসার্চ এ অংশগ্রহন করেছিলেন ?",
                "type": "multipleChoice",
                "options": ["Yes", "No"],
                "required": true
            },
        ]
    }
}

app.get('/demo-survey', function (req, res) {
    res.status(200).send(demoSurvey);
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