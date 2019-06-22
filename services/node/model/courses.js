const mongoose = require("mongoose")

let coursesSchema = mongoose.Schema({
    cname: String,
    ccode: String,
    description: String,
    credits: Number,
    fcode: String,
    dcode: String,
    year: String,
    semester: String,
    accept: Boolean,  //for instructor notification purpose
    cmaterials: [{ fileName: String, fileDownloadUri: String, fileType: String, size: String }],
    assignments: [{ topic: String, description: String, dueDate: String, data: [{ fileName: String, fileDownloadUri: String, fileType: String, size: String }] }]
})

const Courses = mongoose.model("Courses", coursesSchema)

module.exports = Courses
