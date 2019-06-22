import React, {Component} from 'react';
import {
    MDBBtn,
    MDBCol,
    MDBInput,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBCard,
    MDBCardHeader,
    MDBCardBody
} from 'mdbreact';
import config from "../functions/config";
import {getHash} from "../functions/Functions";

const nodeBaseUrl = config.nodeBaseUrl;
const springBaseUrl = config.springBaseUrl;

export default class CourseManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseID: '',
            courseName: '',
            courseYear: '',
            courseSemester: '',
            courseDescription: '',
            courseFaculty: '',
            courseDegree: '',
            courseCredits: '',
            courseInstructors: [],
            instructors: [],
            degrees: [],
            faculties: [],
            courses: [],
            courseButtonName: '',
            cmaterials: [],
            coursesOfAInstructor: []
        };
    }

    componentDidMount() {
        this.setState({courseButtonName: "Add Course"});
        //Fetch from back end and assign to faculties array from here
        this.getFaculties();
        this.getCourses();
    }

    getToken = () => {
        var user = localStorage.getItem('sis-user')
        if (user) {
            user = JSON.parse(user)
            return user.token
        }
        return null
    };

    getFaculties = () => {
        let allFaculties = [];
        fetch(nodeBaseUrl + "/faculties", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.getToken()
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                alert("Error when obtaining faculty")
            }
        }).then(data => {
            data.faculties.map((item) => {
                return allFaculties.push({
                    facultyCode: item.fcode,
                    facultyName: item.fname,
                    facultyDescription: item.description
                    //degrees: item.degrees
                })
            });
            this.setState({faculties: allFaculties})
        }).catch(err => {
            console.log(err)
        })
    };

    getCourses = () => {
        var allCourses = [];
        fetch(nodeBaseUrl + "/courses/course", {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.getToken()
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                alert("Error when obtaining courses")
            }
        }).then(data => {
            console.log(data);
            data.courses.map((item) => {
                return allCourses.push({
                    courseID: item.ccode,
                    courseName: item.cname,
                    courseYear: item.year,
                    courseSemester: item.semester,
                    courseDescription: item.description,
                    courseFaculty: item.fcode,
                    courseDegree: item.dcode,
                    courseCredits: item.credits,
                    courseStatus: item.accept
                })
            });
            this.setState({courses: allCourses})
        }).catch(err => {
            console.log(err)
        })
    };

    getDegreeForFaculty = (facultyCode) => {
        let allDegrees = [];
        fetch(nodeBaseUrl + "/degrees", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.getToken()
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                alert("Error when obtaining degrees")
            }
        }).then(data => {
            data.degrees.map((item) => {
                return allDegrees.push({
                    facultyCode: item.fcode,
                    degreeCode: item.dcode,
                    degreeName: item.dname,
                    degreeDuration: item.duration
                })
            });
            this.setState({degrees: allDegrees})
        }).catch(err => {
            console.log(err)
        })
    };

    getInstructors = () => {
        let allInstructors = [];
        fetch(springBaseUrl + "/users/roles/instructor", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.getToken()
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                alert("Error when obtaining instructors");
            }
        }).then(data => {
            data.map((item) => {
                return allInstructors.push({
                    instructorID: item.id,
                    instructorFaculty: item.faculty,
                    instructorDegree: item.degree,
                    instructorFirstName: item.firstName,
                    instructorLastName: item.lastName,
                    instructorNic: item.nic,
                    instructorPhone: item.mobile,
                    instructorEmail: item.email,
                    instructorPassword: item.password,
                    instructorAddress: item.address
                })
            });

            this.setState({instructors: allInstructors})
        }).catch(err => {
            console.log(err)
        })
    };

    deleteCourse(courseID) {
        fetch(nodeBaseUrl + "/courses/" + courseID, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.getToken()
            })
        }).then(result => {
            if (result.ok) {
                alert("Course deleted successfully");
                this.getCourses();
            } else {
                alert("Course can't be deleted");
            }
        }).catch(err => {
            alert(JSON.parse(err.error));
        });
    }


    getCourseByID = (courseID) => {
        fetch(nodeBaseUrl + "/courses/" + courseID, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.getToken()
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                alert("Error when obtaining the course information")
            }
        }).then(data => {
            this.setState({courseID: data.ccode});
            this.setState({courseName: data.cname});
            this.setState({courseYear: data.year});
            this.setState({courseSemester: data.semester});
            this.setState({courseDescription: data.description});
            this.setState({courseFaculty: data.fcode});
            this.setState({courseDegree: data.dcode});
            this.setState({courseCredits: data.credits});
            //this.setState({courseInstructors: data.courseInstructors});
        }).catch(err => {
            console.log(err)
        })
    };

    addCourse = (obj) => {
        fetch(nodeBaseUrl + "/courses", {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.getToken()
            })
        }).then(result => {
            if (result.ok) {
                alert("Course added successfully");
            } else {
                alert("The course can't be added");
            }
        }).catch(err => {
            alert(JSON.parse(err.error));
        });
    };

    updateCourse = (courseID, obj) => {
        fetch(nodeBaseUrl + "/courses/" + courseID, {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.getToken()
            })
        }).then(result => {
            if (result.ok) {
                alert("Course updated successfully");
            } else {
                alert("The course can't be updated");
            }
        }).catch(err => {
            alert(JSON.parse(err.error));
        });
    };

    addInstructorsToArray(name, email) {
        let tempArray = this.state.courseInstructors;

        if (tempArray !== []) {
            let breakCondition = false;
            tempArray.map((item) => {
                if ((item.instructorEmail === email) && !breakCondition) {
                    //Error Message if ids are same
                    alert("Trying to add the same person");
                    breakCondition = true;
                    return null;
                }
                return null;
            });
            if (!breakCondition) {
                tempArray.push({
                    instructorName: name,
                    instructorEmail: email
                });
                this.setState({courseInstructors: tempArray});
            }
        } else {
            tempArray.push({
                instructorName: name,
                instructorEmail: email
            });
            this.setState({courseInstructors: tempArray});
        }
    };

    addCourseToInstructor = (courseID, email) => {
        var instructorArray = this.state.instructors;
        var tempArray = this.state.coursesOfAInstructor;

        if (instructorArray !== []) {
            let breakCondition = false;
            instructorArray.map((item) => {
                if ((item.instructorEmail === email) && !breakCondition) {
                    if (item.courses !== []) {
                        tempArray.push(item.courses);
                        console.log(tempArray);
                        console.log(courseID);
                        this.setState({coursesOfAInstructor: tempArray ? [...tempArray, courseID] : [courseID]}, () => {
                            let obj = {
                                "id": item.instructorID,
                                "courses": this.state.coursesOfAInstructor
                            };

                            fetch(springBaseUrl + "/users", {
                                method: 'PUT',
                                body: JSON.stringify(obj),
                                headers: new Headers({
                                    'Content-Type': 'application/json',
                                    'Authorization': this.getToken()
                                })
                            }).then(result => {
                                if (result.ok) {
                                    console.log("OK")
                                } else {
                                    console.log("FAIL");
                                }
                            }).catch(err => {
                                console.log(JSON.parse(err.error));
                            });
                        });
                        breakCondition = true;
                        return null;
                    } else {
                        this.setState({courseOfAInstructor: [courseID]}, () => {
                            let obj = {
                                "id": item.instructorID,
                                "courses": this.state.coursesOfAInstructor
                            };

                            fetch(springBaseUrl + "/users", {
                                method: 'PUT',
                                body: JSON.stringify(obj),
                                headers: new Headers({
                                    'Content-Type': 'application/json',
                                    'Authorization': this.getToken()
                                })
                            }).then(result => {
                                if (result.ok) {
                                    console.log("OK")
                                } else {
                                    console.log("FAIL");
                                }
                            }).catch(err => {
                                console.log(JSON.parse(err.error));
                            });
                        })
                    }
                }
                return null;
            });
        }
    };

    deleteInstructorFromArray(email) {
        let tempArray = this.state.courseInstructors;
        tempArray = tempArray.filter(obj => obj.instructorEmail !== email);
        this.setState({courseInstructors: tempArray});
    }

    addUpdateCourse(courseID, source) {
        let tempArray = this.state.courses;

        if (source === "fromAddCourse") {
            if (this.state.courseButtonName === "Add Course") {
                if (this.state.courseID === "" || this.state.courseName === "" || this.state.courseYear === "" || this.state.courseSemester === "" ||
                    this.state.courseFaculty === "" || this.state.courseDegree === "" || this.state.courseCredits === "") {
                    //Error Message
                    alert("Error message NIL");
                } else {
                    if (tempArray !== []) {
                        let breakCondition = false;
                        tempArray.map((item) => {
                            if ((item.courseID === this.state.courseID) && !breakCondition) {
                                //Error Message if ids are same
                                alert("Error message");
                                breakCondition = true;
                                return null;
                            }
                            return null;
                        });
                        if (!breakCondition) {
                            let courseObj = {
                                "ccode": this.state.courseID,
                                "cname": this.state.courseName,
                                "year": this.state.courseYear,
                                "semester": this.state.courseSemester,
                                "description": this.state.courseDescription,
                                "fcode": this.state.courseFaculty,
                                "dcode": this.state.courseDegree,
                                "credits": this.state.courseCredits,
                                "accept": false,
                                "cmaterials": this.state.cmaterials,
                                "assignments": []
                            };

                            this.addCourse(courseObj);
                            this.getCourses();

                            this.state.courseInstructors.map((instructor) => {
                                this.addCourseToInstructor(this.state.courseID, instructor.instructorEmail);
                            });


                        }
                    } else {
                        let courseObj = {
                            "ccode": this.state.courseID,
                            "cname": this.state.courseName,
                            "year": this.state.courseYear,
                            "semester": this.state.courseSemester,
                            "description": this.state.courseDescription,
                            "fcode": this.state.courseFaculty,
                            "dcode": this.state.courseDegree,
                            "credits": this.state.courseCredits,
                            "accept": false,
                            "cmaterials": this.state.cmaterials,
                            "assignments": []
                        };

                        this.addCourse(courseObj);
                        this.getCourses();

                        let t = this.state.courseInstructors;
                        t.map((instructor) => {
                            this.addCourseToInstructor(this.state.courseID, instructor.instructorEmail);
                            return null;
                        });

                    }
                }
            } else if (this.state.courseButtonName === "Update Course") {
                let courseObj = {
                    "ccode": this.state.courseID,
                    "cname": this.state.courseName,
                    "year": this.state.courseYear,
                    "semester": this.state.courseSemester,
                    "description": this.state.courseDescription,
                    "fcode": this.state.courseFaculty,
                    "dcode": this.state.courseDegree,
                    "credits": this.state.courseCredits,
                    "accept": false,
                    "cmaterials": this.state.cmaterials,
                    "assignments": []
                };


                this.updateCourse(courseID, courseObj);
                this.setState({courseButtonName: "Add Course"});
            }

            this.setState({courseID: ''});
            this.setState({courseName: ''});
            this.setState({courseYear: ''});
            this.setState({courseSemester: ''});
            this.setState({courseDescription: ''});
            this.setState({courseFaculty: ''});
            this.setState({courseDegree: ''});
            this.setState({courseCredits: ''});
        } else if (source === "fromEditCourse") {
            this.setState({courseButtonName: "Update Course"});

            this.getCourseByID(courseID)
        }
    };

    setFacultyAndDegrees(selectedString) {
        if (selectedString !== "Select Faculty") {
            let array = selectedString.split(" ");
            this.setState({courseFaculty: array[0]});
            this.getDegreeForFaculty(array[0]);
            this.getInstructors();
        }
    }

    setCourseDegree(selectedString) {
        if (selectedString !== "Select Degree") {
            let array = selectedString.split(" ");
            this.setState({courseDegree: array[0]});
        }
    }

    setSelectedInstructors() {
        let targetValue = document.getElementById("instructorSelect");
        let instructorEmail = targetValue[targetValue.selectedIndex].value;
        let instructorName = targetValue[targetValue.selectedIndex].text;

        if (instructorName !== "Select Instructor") {
            this.addInstructorsToArray(instructorName, instructorEmail);
        }
    }

    setYear = (selectedString) => {
        if (selectedString !== "Select Year") {
            this.setState({courseYear: selectedString});
        }
    };

    setSemester = (selectedString) => {
        if (selectedString !== "Select Semester") {
            console.log(selectedString);
            this.setState({courseSemester: selectedString});
        }
    };

    render() {
        return (
            <div>
                <MDBCard>
                    <MDBCardHeader>Course Management</MDBCardHeader>
                    <MDBCardBody>
                        <form>
                            <MDBRow>
                                <MDBCol>
                                    <select className="browser-default custom-select"
                                            onChange={(e) => this.setFacultyAndDegrees(e.target.value)}>
                                        <option>Select Faculty</option>
                                        {this.state.faculties.map((faculty) => {
                                            return <option>
                                                {faculty.facultyCode + " " + faculty.facultyName}
                                            </option>
                                        })}
                                    </select>
                                </MDBCol>
                                <MDBCol>
                                    <select className="browser-default custom-select"
                                            onChange={(e) => this.setCourseDegree(e.target.value)}>
                                        <option>Select Degree</option>
                                        {this.state.degrees.map((degree) => {
                                            return <option>
                                                {degree.degreeCode + " " + degree.degreeName}
                                            </option>
                                        })}
                                    </select>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <MDBInput label="Course ID" group type="text" validate name="courseID"
                                              value={this.state.courseID}
                                              onChange={(e) => this.setState({courseID: e.target.value})}/>
                                </MDBCol>
                                <MDBCol>
                                    <MDBInput label="Course Name" group type="text" validate name="courseName"
                                              value={this.state.courseName}
                                              onChange={(e) => this.setState({courseName: e.target.value})}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <select className="browser-default custom-select"
                                            onChange={(e) => this.setYear(e.target.value)}>
                                        <option>Select Year</option>
                                        <option>1st</option>
                                        <option>2nd</option>
                                        <option>3rd</option>
                                        <option>4th</option>
                                    </select>
                                </MDBCol>
                                <MDBCol>
                                    <select className="browser-default custom-select"
                                            onChange={(e) => this.setSemester(e.target.value)}>
                                        <option>Select Semester</option>
                                        <option>1st</option>
                                        <option>2nd</option>
                                    </select>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md={3}>
                                    <MDBInput label="Course Credits" group type="number" validate name="courseID"
                                              value={this.state.courseCredits}
                                              onChange={(e) => this.setState({courseCredits: e.target.value})}/>
                                </MDBCol>
                                <MDBCol>
                                    <MDBInput type="textarea" label="Course Description" name="courseDescription"
                                              value={this.state.courseDescription}
                                              onChange={(e) => this.setState({courseDescription: e.target.value})}
                                              outline/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <select id="instructorSelect" className="browser-default custom-select"
                                            onChange={() => this.setSelectedInstructors()}>
                                        <option>Select Instructor</option>
                                        {this.state.instructors.map((instructor) => {
                                            return <option value={instructor.instructorEmail}>
                                                {instructor.instructorFirstName + " " + instructor.instructorLastName}
                                            </option>
                                        })}
                                    </select>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <MDBTable>
                                        <MDBTableHead>
                                            <tr>
                                                <th>Instructor Name</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            {this.state.courseInstructors.map((instructor) => {
                                                return <tr key={instructor.instructorEmail}>
                                                    <td>{instructor.instructorName}</td>
                                                    <td>
                                                        <MDBBtn color="danger" rounded type="button"
                                                                className="z-depth-1a"
                                                                onClick={() => this.deleteInstructorFromArray(instructor.instructorEmail)}>Delete</MDBBtn>
                                                    </td>
                                                </tr>
                                            })}
                                        </MDBTableBody>
                                    </MDBTable>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol><MDBBtn color="primary" rounded type="button" className="z-depth-1a"
                                                onClick={() => this.addUpdateCourse(this.state.courseID, "fromAddCourse")}>{this.state.courseButtonName}</MDBBtn>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <MDBTable>
                                        <MDBTableHead>
                                            <tr>
                                                <th>Course ID</th>
                                                <th>Course Name</th>
                                                <th>Course Year</th>
                                                <th>Course Semester</th>
                                                <th>Course Description</th>
                                                <th>Course Faculty</th>
                                                <th>Course Degree</th>
                                                <th>Course Credit</th>
                                                <th>Course Status</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            {this.state.courses.map((course) => {
                                                return <tr key={course.courseID}>
                                                    <td>{course.courseID}</td>
                                                    <td>{course.courseName}</td>
                                                    <td>{course.courseYear}</td>
                                                    <td>{course.courseSemester}</td>
                                                    <td>{course.courseDescription}</td>
                                                    <td>{course.courseFaculty}</td>
                                                    <td>{course.courseDegree}</td>
                                                    <td>{course.courseCredits}</td>
                                                    <td>{course.courseStatus}</td>
                                                    <td>
                                                        <MDBBtn color="danger" rounded type="button"
                                                                className="z-depth-1a"
                                                                onClick={() => this.deleteCourse(course.courseID)}>Delete</MDBBtn>
                                                    </td>
                                                </tr>
                                            })}
                                        </MDBTableBody>
                                    </MDBTable>
                                </MDBCol>
                            </MDBRow>
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </div>
        );
    }
}

/*<MDBBtn color="primary" rounded type="button" className="z-depth-1a"
                                                                onClick={() => this.addUpdateCourse(course.courseID, "fromEditCourse")}>Edit</MDBBtn>{' '}*/