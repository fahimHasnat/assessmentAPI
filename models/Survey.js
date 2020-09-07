const mongoose = require("mongoose");

const surveySchema = mongoose.Schema({
    surveyName: String,
    version: String,
    date: {
        type: String,
        default: new Date()
    },
    rest: String,
}, { strict: false });

module.exports = mongoose.model("Survey", surveySchema);