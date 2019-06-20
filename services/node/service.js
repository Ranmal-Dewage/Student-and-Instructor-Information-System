const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const facultyController = require("./controller/facultyController")
const degreeController = require("./controller/degreeController")
const courseController = require("./controller/courseController")


mongoose.connect("mongodb://localhost:27017/siis", { useNewUrlParser: true })
const db = mongoose.connection

db.on("error", (err) => {
    console.log("Error : " + err)
})

db.once("open", () => {
    console.log("Connected to MongoDB")
})

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    try {
        res.status(200).send("Welcome to Server on 4000")
    } catch (ex) {
        res.status(500).send("Server Error" + ex)
    }
})

app.use("/faculties", facultyController);
app.use("/degrees", degreeController);
app.use("/courses", courseController);

app.listen(4000, () => {
    console.log("Server Running on port 4000")
})

