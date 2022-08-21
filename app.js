const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const { shuffle } = require("./util");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { swaggerDocument } = require("./swagger");
const app = express();

///Middleware
app.use(bodyParser.json({ limit: "100mb" }));

app.use("/public", express.static(path.join(__dirname, "public")));

const swaggerDocs = swaggerJsDoc(swaggerDocument);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, responseType"
  );
  next();
});

let survey = [
  {
    id: 1,
    question: "How are you ?",
    type: "multipleChoice",
    options: [
      { value: "Very Good", referTo: 2 },
      { value: "Good", referTo: 2 },
      { value: "Neutral", referTo: 2 },
      { value: "Bad", referTo: 3 },
      { value: "Very Bad", referTo: 3 },
    ],
    required: true,
  },
  {
    id: 2,
    question: "Where do you live ?",
    type: "textInput",
    options: null,
    referTo: 6,
    required: true,
  },
  {
    id: 3,
    question: "What Happened ?",
    type: "dropdown",
    options: [
      { value: "Ajke amr mon valo nei", referTo: 5 },
      { value: "Value of taka has dropped lower than my CGPA", referTo: 4 },
      { value: "I am so lonely broken angel", referTo: 2 },
      { value: "Pet kharap", referTo: 2 },
    ],
    required: true,
  },
  {
    id: 4,
    question: "What should we be doing to solve this ?",
    type: "checkbox",
    options: [
      { value: "Taka te pathor bedhe takar weight barano jay", referTo: 6 },
      {
        value:
          "We can add extra 0 in every note so that 50 taka note will become 500",
        referTo: 6,
      },
      { value: "Pamper Taka day n night jeno tar vab bere jay", referTo: 6 },
    ],
    required: true,
  },
  {
    id: 5,
    question: "Mon valo korar jonno koto taka dorkar ?",
    type: "numberInput",
    options: null,
    referTo: "submit",
    required: true,
  },
  {
    id: 6,
    question: "Take a selfie",
    type: "camera",
    options: null,
    referTo: "submit",
    required: false,
  },
];

/**
 * @swagger
 * /getSurvey:
 *  get:
 *    description: Use to request survey
 *    responses:
 *      '200':
 *        description: A successful response
 */

app.get("/getSurvey", function (req, res) {
  res.json(survey);
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

app.get("/", function (req, res) {
  res.json("This an API for serving example JSON responses");
});

// const mongoose = require('mongoose');
// const Survey = require('./models/Survey')

// mongoose.connect(`mongodb+srv://fahim:fahim@cluster0.li6l5.mongodb.net/<dbname>?retryWrites=true&w=majority`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true
// });

// mongoose.Promise = global.Promise;

///Error Handler
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  log({ message: message, data: data });
  res.status(status).json({ message: message, data: data });
});

app.listen(process.env.PORT, () => {
  console.log(`The server is running on port ${process.env.PORT}`);
});
