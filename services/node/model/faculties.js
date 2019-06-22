const mongoose = require("mongoose");

let facultiesSchema = mongoose.Schema({
    fname: String,
    fcode: String,
    description: String
});

const Faculties = mongoose.model('Faculties', facultiesSchema);

module.exports = Faculties;
