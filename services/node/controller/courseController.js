const express = require("express")
const route = express.Router()
const jwt = require("jsonwebtoken")
const Courses = require("../model/courses")
const tf = require("../verifyToken")


//create courses
route.post("/", tf.verifyToken, (req, res) => {

    jwt.verify(req.token, "c6h12o6", (err, authData) => {
        if (err) {
            res.status(403).json({ status: "forbidden" })
        } else {
            try {
                const query = { $or: [{ cname: req.body.cname }, { ccode: req.body.ccode }] }
                Courses.find(query, (err, course) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ error: err });
                    } else {
                        if (course.length != 0) {
                            res.status(200).json({ courseExist: true });
                        } else {
                            let courses = new Courses(req.body);
                            courses.save(err => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).json({ error: err });
                                } else {
                                    res.status(201).json({ courseExist: false });
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

//update courses
//meke mama instructors id eka update karapu widiya wenas ube UI eke update eka balala ayee eka hadanna onee 
route.put("/:code", tf.verifyToken, (req, res) => {

    jwt.verify(req.token, "c6h12o6", (err, authData) => {
        if (err) {
            res.status(403).json({ status: "forbidden" })
        } else {
            var arrayIns = req.body.iid
            delete req.body.iid
            try {
                const query = { ccode: req.params.code }
                Courses.updateOne(query, req.body, (err) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json({ error: err });
                    } else {
                        const promise = new Promise((resolve, reject) => {
                            if (arrayIns.length != 0) {
                                Courses.updateOne(query, { $push: { iid: arrayIns } }, (err) => {
                                    if (err) {
                                        console.log(err)
                                        reject(false)
                                    } else {
                                        resolve(true)
                                    }
                                })
                            } else {
                                resolve(true)
                            }
                        })
                        promise.then((data) => {
                            res.status(200).json({ status: data })
                        }).catch((err) => {
                            console.log("Error : " + err)
                            res.status(500).json({ error: err });
                        })
                    }
                })
            } catch (ex) {
                res.status(500).send("Server Error" + ex)
            }
        }
    })

})


//delete courses
route.delete("/:code", tf.verifyToken, (req, res) => {

    jwt.verify(req.token, "c6h12o6", (err, authData) => {
        if (err) {
            res.status(403).json({ status: "forbidden" })
        } else {
            try {
                const query = { ccode: req.params.code }
                Courses.deleteOne(query, (err) => {
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


//courses search from course code and name
//eg :- localhost:4000/courses/application framework
//or
//eg :- localhost:4000/courses/se3010
//or
//eg :- localhost:4000/courses/app
//kiyala gahuwoth app kalla name eke thiyena okkoma course enawa
//case insensitive
route.get("/:name", tf.verifyToken, (req, res) => {

    jwt.verify(req.token, "c6h12o6", (err, authData) => {
        if (err) {
            res.status(403).json({ status: "forbidden" })
        } else {
            try {
                const query = { $or: [{ cname: new RegExp(req.params.name, "i") }, { ccode: new RegExp(req.params.name, "i") }] }
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

//get courses belong to a paricular degress,year and semester
//eg :- localhost:4000/courses?dcode=SE&year=3rd&sem=1st
route.get("/", tf.verifyToken, (req, res) => {

    jwt.verify(req.token, "c6h12o6", (err, authData) => {
        if (err) {
            res.status(403).json({ status: "forbidden" })
        } else {
            try {
                const query = { dcode: req.query.dcode, year: req.query.year, semester: req.query.sem }
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
