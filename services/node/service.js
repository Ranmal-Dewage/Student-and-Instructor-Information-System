const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const jwt = require("jsonwebtoken")
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


//welcome message
app.get("/", (req, res) => {

    try {
        res.status(200).send("Welcome to Server on 4000")
    } catch (ex) {
        res.status(500).send("Server Error" + ex)
    }

    // jwt.verify(req.token, "c6h12o6", (err, authData) => {
    //     if (err) {
    //         res.status(403).json({ status: "forbidden" })
    //     } else {

    //     }
    // })

})


//to create jwt token
app.post("/login", (req, res) => {

    //mock user
    const user = {
        id: 100,
        name: "Ranmal Dewage"
    }

    jwt.sign({ user: user }, config.secret, (err, token) => {
        if (err) {
            res.status(500).json({ error: err })
        } else {
            res.status(200).json({ token: token })
        }
    })

})


app.use("/faculties", facultyController);
app.use("/degrees", degreeController);
app.use("/courses", courseController);

app.listen(4000, () => {
    console.log("Server Running on port 4000")
})

