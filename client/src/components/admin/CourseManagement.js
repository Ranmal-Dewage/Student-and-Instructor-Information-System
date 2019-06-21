import React, {Component} from 'react';
import {MDBBtn, MDBCol, MDBInput, MDBRow, MDBTable, MDBTableBody, MDBTableHead, MDBCard, MDBCardHeader, MDBCardBody} from 'mdbreact';

export default class CourseManagement extends Component {

    constructor(props) {
        super(props);
        this.state ={
            courseID: '',
            courseName: '',
            courseYear: '',
            courseSemester: '',
            courseDescription: '',
            courseFaculty: '',
            courseDegree:'',
            courseCredits:'',
            courseInstructors: [],
            instructors:[],
            degrees: [],
            faculties: [],
            courses: [],
            courseButtonName: ''
        };
    }

    componentDidMount() {
        this.setState({courseButtonName: "Add Course"});
        //Fetch from back end and assign to faculties array from here
        this.getFaculties();
        this.getCourses();
    }

    getFaculties = () => {
        let allFaculties = [];
        fetch("http://localhost:3001/admin/faculties").then(res =>{
            if(res.ok){
                return res.json();
            } else {
                alert("Error when obtaining faculty")
            }
        }).then(data => {
            data.map((item) =>{
                return allFaculties.push({
                    facultyCode: item.facultyCode,
                    facultyName: item.facultyName,
                    facultyDescription: item.facultyDescription,
                    degrees: item.degrees
                })
            });
            this.setState({faculties: allFaculties})
        }).catch(err => {
            console.log(err)
        })
    };

    getCourses = () => {
        let allCourses = [];
        fetch("http://localhost:3001/admin/courses").then(res =>{
            if(res.ok){
                return res.json();
            } else {
                alert("Error when obtaining courses")
            }
        }).then(data => {
            data.map((item) =>{
                return allCourses.push({
                    courseID: item.courseID,
                    courseName: item.courseName,
                    courseYear: item.courseYear,
                    courseSemester: item.courseSemester,
                    courseDescription: item.courseDescription,
                    courseFaculty: item.courseFaculty,
                    courseDegree: item.courseDegree,
                    courseInstructors: item.courseInstructors,
                    courseCredits: item.courseCredits,
                    courseStatus: item.courseStatus
                })
            });
            this.setState({courses: allCourses})
        }).catch(err => {
            console.log(err)
        })
    };

    getDegreeForFaculty = (facultyCode) => {
        let degrees = [];
        fetch("http://localhost:3001/admin/faculties/degrees/"+ facultyCode).then(res =>{
            if(res.ok){
                return res.json();
            } else {
                alert("Error when obtaining degrees")
            }
        }).then(data => {
            data.map((item) =>{
                return degrees.push({
                    facultyCode: item.facultyCode,
                    degreeCode: item.degreeCode,
                    degreeName: item.degreeName,
                    degreeDescription: item.degreeDescription})
            });
            this.setState({degrees: degrees})
        }).catch(err => {
            console.log(err)
        })
    };

    getInstructorsForFaculty = (facultyCode) => {
        let instructors = [];
        fetch("http://localhost:3001/admin/faculties/instructors/"+ facultyCode).then(res =>{
            if(res.ok){
                return res.json();
            } else {
                alert("Error when obtaining instructors")
            }
        }).then(data => {
            data.map((item) =>{
                return instructors.push({
                    instructorFirstName: item.instructorFirstName,
                    instructorLastName: item.instructorLastName,
                    instructorEmail: item.instructorEmail,
                })
            });
            this.setState({instructors: instructors})
        }).catch(err => {
            console.log(err)
        })
    };

    deleteCourse(courseID) {
        fetch("http://localhost:3001/admin/courses/"+ courseID, {
            method: 'DELETE',
            headers:{'Content-Type': 'application/json'}
        }).then(result => {
            if(result.ok){
                alert("Course deleted successfully");
                this.getCourses();
            } else {
                alert("Course can't be deleted");
            }
        }).catch(err => {
            alert(JSON.parse(err.error));
        });
    }

    addInstructorsToArray(name,email){
        let tempArray = this.state.courseInstructors;

        if(tempArray !== []){
            let breakCondition = false;
            tempArray.map((item) => {
                if((item.instructorEmail === email) && !breakCondition){
                    //Error Message if ids are same
                    alert("Trying to add the same person");
                    breakCondition = true;
                    return null;
                }
                return null;
            });
            if(!breakCondition){
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

    deleteInstructorFromArray(email){
        let tempArray = this.state.courseInstructors;
        tempArray = tempArray.filter(obj => obj.instructorEmail !== email);
        this.setState({courseInstructors: tempArray});
    }

    addUpdateCourse(courseID, source){
        let tempArray = this.state.courses;

        if(source === "fromAddCourse"){
            if(this.state.courseButtonName === "Add Course"){
                if( this.state.courseID === "" || this.state.courseName === "" || this.state.courseYear === "" ||  this.state.courseSemester === "" ||
                    this.state.courseFaculty === "" || this.state.courseDegree === "" || this.state.courseCredits === "" || this.state.courseInstructors === []) {
                    //Error Message
                    alert("Error message NIL");
                } else {
                    if(tempArray !== []){
                        let breakCondition = false;
                        tempArray.map((item) => {
                            if((item.courseID === this.state.courseID) && !breakCondition){
                                //Error Message if ids are same
                                alert("Error message");
                                breakCondition = true;
                                return null;
                            }
                            return null;
                        });
                        if(!breakCondition){
                            let courseObj = {
                                courseID: this.state.courseID,
                                courseName:  this.state.courseName,
                                courseYear:  this.state.courseYear,
                                courseSemester:  this.state.courseSemester,
                                courseDescription:  this.state.courseDescription,
                                courseFaculty:  this.state.courseFaculty,
                                courseDegree:  this.state.courseDegree,
                                courseInstructors: this.state.courseInstructors,
                                courseCredits:  this.state.courseCredits,
                                courseStatus: 'pending'
                            };

                            this.addCourse(courseObj);
                            this.getCourses();
                        }
                    } else {
                        let courseObj = {
                            courseID: this.state.courseID,
                            courseName:  this.state.courseName,
                            courseYear:  this.state.courseYear,
                            courseSemester:  this.state.courseSemester,
                            courseDescription:  this.state.courseDescription,
                            courseFaculty:  this.state.courseFaculty,
                            courseDegree:  this.state.courseDegree,
                            courseInstructors: this.state.courseInstructors,
                            courseCredits:  this.state.courseCredits,
                            courseStatus: 'pending'
                        };

                        this.addCourse(courseObj);
                        this.getCourses();
                    }
                }
            } else if(this.state.courseButtonName === "Update Course") {
                let courseObj = {
                    courseID: this.state.courseID,
                    courseName:  this.state.courseName,
                    courseYear:  this.state.courseYear,
                    courseSemester:  this.state.courseSemester,
                    courseDescription:  this.state.courseDescription,
                    courseFaculty:  this.state.courseFaculty,
                    courseDegree:  this.state.courseDegree,
                    courseInstructors: this.state.courseInstructors,
                    courseCredits:  this.state.courseCredits,
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
            this.setState({courseInstructors: ''});
            this.setState({courseCredits: ''});
        } else if(source === "fromEditCourse"){
            this.setState({courseButtonName: "Update Course"});

            this.getCourseByID(courseID)
        }
    };

    getCourseByID = (courseID) => {
        fetch("http://localhost:3001/admin/courses/"+ courseID).then(res => {
            if(res.ok){
                return res.json();
            } else {
                alert("Error when obtaining the course information")
            }
        }).then(data => {
            this.setState({courseID: data.courseID});
            this.setState({courseName: data.courseName});
            this.setState({courseYear: data.courseYear});
            this.setState({courseSemester: data.courseSemester});
            this.setState({courseDescription: data.courseDescription});
            this.setState({courseFaculty: data.courseFaculty});
            this.setState({courseDegree: data.courseDegree});
            this.setState({courseCredits: data.courseCredits});
            this.setState({courseInstructors: data.courseInstructors});
        }).catch(err => {
            console.log(err)
        })
    };

    addCourse = (obj) => {
        fetch("http://localhost:3001/admin/courses", {
            method: 'POST',
            body: JSON.stringify(obj),
            headers:{'Content-Type': 'application/json'}
        }).then(result => {
            if(result.ok){
                alert("Course added successfully");
            } else {
                alert("The course can't be added");
            }
        }).catch(err => {
            alert(JSON.parse(err.error));
        });
    };

    updateCourse = (courseID,obj) => {
        fetch("http://localhost:3001/admin/courses/"+ courseID, {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers:{'Content-Type': 'application/json'}
        }).then(result => {
            if(result.ok){
                alert("Course updated successfully");
            } else {
                alert("The course can't be updated");
            }
        }).catch(err => {
            alert(JSON.parse(err.error));
        });
    };

    setFacultyAndDegrees(selectedString){
        if(selectedString !== "Select Faculty") {
            let array = selectedString.split(" ");
            this.setState({courseFaculty: array[0]});
            this.getDegreeForFaculty(array[0]);
            this.getInstructorsForFaculty(array[0]);
        }
    }

    setCourseDegree(selectedString){
        if(selectedString !== "Select Degree") {
            let array = selectedString.split(" ");
            this.setState({courseDegree: array[0]});
        }
    }

    setSelectedInstructors(){
        let targetValue = document.getElementById("instructorSelect");
        let instructorEmail = targetValue[targetValue.selectedIndex].value;
        let instructorName = targetValue[targetValue.selectedIndex].text;

        if(instructorName !== "Select Instructor") {
            this.addInstructorsToArray(instructorName,instructorEmail);
        }
    }

    setYear = (selectedString) => {
        if(selectedString !== "Select Year"){
            this.setState({courseYear: selectedString});
        }
    };

    setSemester = (selectedString) => {
        if(selectedString !== "Select Semester"){
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
                                    <select className="browser-default custom-select" onChange={(e) => this.setFacultyAndDegrees(e.target.value)}>
                                        <option>Select Faculty</option>
                                        {this.state.faculties.map((faculty) => {
                                            return <option>
                                                {faculty.facultyCode + " " + faculty.facultyName}
                                            </option>
                                        })}
                                    </select>
                                </MDBCol>
                                <MDBCol>
                                    <select className="browser-default custom-select" onChange={(e) => this.setCourseDegree(e.target.value)}>
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
                                    <MDBInput label="Course ID" group type="text" validate name="courseID" value={this.state.courseID}
                                                      onChange={(e) => this.setState({courseID: e.target.value})}/>
                                </MDBCol>
                                <MDBCol>
                                    <MDBInput label="Course Name" group type="text" validate name="courseName" value={this.state.courseName}
                                              onChange={(e) => this.setState({courseName: e.target.value})}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <select className="browser-default custom-select" onChange={(e) => this.setYear(e.target.value)}>
                                        <option>Select Year</option>
                                        <option>1st</option>
                                        <option>2nd</option>
                                        <option>3rd</option>
                                        <option>4th</option>
                                    </select>
                                </MDBCol>
                                <MDBCol>
                                    <select className="browser-default custom-select" onChange={(e) => this.setSemester(e.target.value)}>
                                        <option>Select Semester</option>
                                        <option>1st</option>
                                        <option>2nd</option>
                                    </select>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md={3}>
                                    <MDBInput label="Course Credits" group type="number" validate name="courseID" value={this.state.courseCredits}
                                              onChange={(e) => this.setState({courseCredits: e.target.value})}/>
                                </MDBCol>
                                <MDBCol>
                                    <MDBInput type="textarea" label="Course Description" name="courseDescription" value={this.state.courseDescription}
                                              onChange={(e) => this.setState({courseDescription: e.target.value})} outline />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <select id="instructorSelect" className="browser-default custom-select" onChange={() => this.setSelectedInstructors()}>
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
                                                        <MDBBtn color="danger" rounded type="button" className="z-depth-1a"
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
                                                <th>Course Instructors</th>
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
                                                    <td><MDBTable>
                                                            <MDBTableBody>
                                                                {course.courseInstructors.map((instructor) => {
                                                                    return <tr>
                                                                        <td>{instructor.instructorName}</td>
                                                                    </tr>
                                                                })}
                                                            </MDBTableBody>
                                                    </MDBTable></td>
                                                    <td>{course.courseCredits}</td>
                                                    <td>{course.courseStatus}</td>
                                                    <td><MDBBtn color="primary" rounded type="button" className="z-depth-1a"
                                                                onClick={() => this.addUpdateCourse(course.courseID, "fromEditCourse")}>Edit</MDBBtn>{' '}
                                                        <MDBBtn color="danger" rounded type="button" className="z-depth-1a"
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