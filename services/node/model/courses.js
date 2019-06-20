const mongoose = require("mongoose")

let coursesSchema = mongoose.Schema({
    cname: String,
    ccode: String,
    description: String,
    credits:Number,
    fcode: String,
    dcode: String,
    year: String,
    semester: String,
    iid: [String],
    accept:Boolean  //for instructor notification purpose 
})

const Courses = mongoose.model("Courses", coursesSchema)

module.exports = Courses
