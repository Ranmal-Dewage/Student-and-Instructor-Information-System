const express = require("express")
const route = express.Router()
const jwt = require("jsonwebtoken")
const Courses = require("../model/courses")
const tf = require("../verifyToken")
const config = require("../config.json")
const fetch = require("node-fetch")

//create courses
route.post("/", tf.verifyToken, (req, res) => {

    jwt.verify(req.token, config.secret, (err, authData) => {
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
route.put("/:code", tf.verifyToken, (req, res) => {

    jwt.verify(req.token, config.secret, (err, authData) => {
        if (err) {
            res.status(403).json({ status: "forbidden" })
        } else {
            try {
                const query = { ccode: req.params.code }
                Courses.updateOne(query, req.body, (err) => {
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


//delete courses
route.delete("/:code", tf.verifyToken, (req, res) => {

    jwt.verify(req.token, config.secret, (err, authData) => {
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

    jwt.verify(req.token, config.secret, (err, authData) => {
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

//get course by code
route.get("/course/:code", (req, res) => {

    try {
        const query = { ccode: req.params.code }
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

})

//get courses belong to a paricular degress,year and semester
//eg :- localhost:4000/courses?dcode=SE&year=3rd&sem=1st
route.get("/", tf.verifyToken, (req, res) => {

    jwt.verify(req.token, config.secret, (err, authData) => {
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

//update course materials 
route.post("/:id/materials", async (req, res) => {


    try {

        await req.body.data.map(elem => {
            const query = { ccode: req.params.id }
            Courses.updateOne(query, { $push: { cmaterials: elem } }, (err) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: err });
                }
            })
        })

        res.status(200).json({ success: true })




        //     // console.log(req.body)
        //     // const option = {
        //     //     method: "POST",
        //     //     body: req.body
        //     // }
        //     // fetch("http://192.168.8.100:9091/files", option).
        //     //     then(res => res.json()).
        //     //     then(res => {
        //     //         console.log(res)
        //     //     });
        //     // console.log(req.body.length)
        //     // console.log(typeof req.body)
        //     // fetch("http://192.168.8.100:9091/files/many", {
        //     //     method: 'POST',
        //     //     body: req.body
        //     // }).then(newRes => newRes.json()).
        //     //     then(data => {
        //     //         console.log(data)
        //     //         res.status(200).send("miomcdioko")
        //     //     }).catch(err => {
        //     //         console.log(err)
        //     //     })


    } catch (ex) {
        res.status(500).send("Server Error" + ex)
    }


})

//get course materials
route.get("/:id/materials", (req, res) => {

    try {
        const query = { ccode: req.params.id }
        Courses.find(query, (err, course) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ materials: course[0].cmaterials })
            }
        });
    } catch (ex) {
        res.status(500).send("Server Error" + ex)
    }

})

//delete course material
route.delete("/:id/materials/:name", (req, res) => {

    try {
        const query = { ccode: req.params.id }
        Courses.updateOne(query, { $pull: { cmaterials: { fileName: req.params.name } } }, (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ status: true })
            }
        });
    } catch (ex) {
        res.status(500).send("Server Error" + ex)
    }

})





module.exports = route
