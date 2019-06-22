const express = require("express")
const route = express.Router()
const jwt = require("jsonwebtoken")
const Faculties = require("../model/faculties")
const Degrees = require("../model/degrees")
const tf = require("../verifyToken")
const config = require("../config.json")


//faculty creation
route.post("/", tf.verifyToken, (req, res) => {

    jwt.verify(req.token, config.secret, (err, authData) => {
        if (err) {
            res.status(403).json({ status: "forbidden" })
        } else {
            try {
                const query = { $or: [{ fname: req.body.fname }, { fcode: req.body.fcode }] }
                Faculties.find(query, (err, faculty) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ error: err });
                    } else {
                        if (faculty.length != 0) {
                            res.status(200).json({ facultyExist: true });
                        } else {
                            let faculties = new Faculties(req.body);
                            faculties.save(err => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).json({ error: err });
                                } else {
                                    res.status(201).json({ facultyExist: false });
                                }
                            });
                        }
                    }
                });
            } catch (ex) {
                res.status(500).send("Server Error" + ex)
            }
        }
    })

})

//get all faculties
route.get("/", (req, res) => {

    try {
        const query = {}
        Faculties.find(query, (err, faculty) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ faculties: faculty })
            }
        });
    } catch (ex) {
        res.status(500).send("Server Error" + ex)
    }

})

//get faculty by code
route.get("/:code", (req, res) => {

    try {
        const query = { fcode: req.params.code }
        Faculties.find(query, (err, faculty) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ faculties: faculty })
            }
        });
    } catch (ex) {
        res.status(500).send("Server Error" + ex)
    }

})

//update faculties
route.put("/:code", tf.verifyToken, (req, res) => {

    jwt.verify(req.token, config.secret, (err, authData) => {
        if (err) {
            res.status(403).json({ status: "forbidden" })
        } else {
            try {
                const query = { fcode: req.params.code }
                Faculties.updateOne(query, req.body, (err) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json({ error: err });
                    } else {
                        res.status(200).json({ status: true })
                    }
                })
            } catch (ex) {
                res.status(500).send("Server Error" + ex)
            }
        }
    })

})

//delete faculties
route.delete("/:code", tf.verifyToken, (req, res) => {

    jwt.verify(req.token, config.secret, (err, authData) => {
        if (err) {
            res.status(403).json({ status: "forbidden" })
        } else {
            try {
                const query = { fcode: req.params.code }
                Faculties.deleteOne(query, (err) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json({ error: err });
                    } else {
                        res.status(200).json({ status: true })
                    }
                })
            } catch (ex) {
                res.status(500).send("Server Error" + ex)
            }
        }
    })

})

//get degrees of particular course
//eg :- localhost:4000/faculties/IT/degrees
route.get("/:code/degrees", tf.verifyToken, (req, res) => {

    try {
        const query = { fcode: req.params.code }
        Degrees.find(query, (err, degree) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ degrees: degree })
            }
        });
    } catch (ex) {
        res.status(500).send("Server Error" + ex)
    }

})


module.exports = route

