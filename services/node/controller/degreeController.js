const express = require("express")
const route = express.Router()
const jwt = require("jsonwebtoken")
const Degrees = require("../model/degrees")
const Courses = require("../model/courses")
const tf = require("../verifyToken")
const config = require("../config.json")

//degree creation
route.post("/", tf.verifyToken, (req, res) => {

    jwt.verify(req.token, config.secret, (err, authData) => {
        if (err) {
            res.status(403).json({ status: "forbidden" })
        } else {
            try {
                const query = { $or: [{ dname: req.body.dname }, { dcode: req.body.dcode }] }
                Degrees.find(query, (err, degree) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ error: err });
                    } else {
                        if (degree.length != 0) {
                            res.status(200).json({ degreeExist: true });
                        } else {
                            let degrees = new Degrees(req.body);
                            degrees.save(err => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).json({ error: err });
                                } else {
                                    res.status(201).json({ degreeExist: false });
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

});

//get all degrees 
route.get("/", tf.verifyToken, (req, res) => {

    jwt.verify(req.token, config.secret, (err, authData) => {
        if (err) {
            res.status(403).json({ status: "forbidden" })
        } else {
            try {
                const query = {}
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
        }
    })

})

//get degree by code
route.get("/:code", (req, res) => {

    try {
        const query = { dcode: req.params.code }
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

//update degrees
route.put("/:code", tf.verifyToken, (req, res) => {

    jwt.verify(req.token, config.secret, (err, authData) => {
        if (err) {
            res.status(403).json({ status: "forbidden" })
        } else {
            try {
                const query = { dcode: req.params.code }
                Degrees.updateOne(query, req.body, (err) => {
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

//delete degrees
route.delete("/:code", tf.verifyToken, (req, res) => {

    jwt.verify(req.token, config.secret, (err, authData) => {
        if (err) {
            res.status(403).json({ status: "forbidden" })
        } else {
            try {
                const query = { dcode: req.params.code }
                Degrees.deleteOne(query, (err) => {
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

//get all courses of a degree
//eg :- localhost:4000/degrees/SE/courses
route.get("/:code/courses", tf.verifyToken, (req, res) => {

    jwt.verify(req.token, config.secret, (err, authData) => {
        if (err) {
            res.status(403).json({ status: "forbidden" })
        } else {
            try {
                const query = { dcode: req.params.code }
                Courses.find(query, (err, course) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ error: err });
                    } else {
                        res.status(200).json({ courses: course })
                    }
                });
            } catch (ex) {
                res.status(500).send("Server Error" + ex)
            }
        }
    })

})


module.exports = route

