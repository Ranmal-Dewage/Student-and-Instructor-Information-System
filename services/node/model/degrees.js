const mongoose = require("mongoose")

let degreesSchema = mongoose.Schema({
    dname: String,
    dcode: String,
    duration: String,
    price: Number,
    fcode: String
})

const Degrees = mongoose.model("Degrees", degreesSchema)

module.exports = Degrees
