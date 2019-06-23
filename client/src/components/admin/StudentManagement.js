import React, {Component} from 'react';
import {MDBBtn, MDBCol, MDBInput, MDBRow, MDBTable, MDBTableBody, MDBTableHead, MDBCard, MDBCardHeader, MDBCardBody, MDBBadge} from 'mdbreact';

const nodeBasedUrl = "http://192.168.8.104:4000";

export default class StudentManagement extends Component {

    constructor(props) {
        super(props);
        this.state ={
            studentCodePrefix: '',
            studentCode: '',
            studentName: '',
            studentEmail: '',
            studentPassword:'',
            studentPhone: '',
            studentFaculty: '',
            studentDegree:'',
            degrees: [],
            faculties: [],
            students: [],
            studentButtonName: '',
        };
    }

    componentDidMount() {
        this.setState({studentButtonName: "Add Student"});
        //Fetch from back end and assign to faculties array from here
        this.getFaculties();
        this.getStudents();
    }

    getFaculties = () => {
        let allFaculties = [];
        fetch(nodeBasedUrl+"/admin/faculties").then(res =>{
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

    getDegreeForFaculty = (facultyCode) => {
        let degrees = [];
        fetch(nodeBasedUrl+"/admin/faculties/degrees/"+ facultyCode).then(res =>{
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
                    degreeDuration: item.degreeDuration})
            });
            this.setState({degrees: degrees})
        }).catch(err => {
            console.log(err)
        })
    };

    getStudents = () => {
        let allStudents = [];
        fetch(nodeBasedUrl+"/admin/students").then(res =>{
            if(res.ok){
                return res.json();
            } else {
                alert("Error when obtaining students")
            }

        }).then(data => {
            data.map((item) =>{
                return allStudents.push({
                    studentID: item.studentID,
                    studentName: item.studentName ,
                    studentEmail: item.studentEmail,
                    studentPassword: item.studentPassword,
                    studentFaculty: item.studentFaculty,
                    studentDegree: item.studentDegree,
                    studentPhone: item.studentPhone,
                })
            });
            this.setState({students: allStudents})
        }).catch(err => {
            console.log(err)
        })
    };

    deleteStudent(studentID) {
        fetch(nodeBasedUrl+"/admin/students/"+ studentID, {
            method: 'DELETE',
            headers:{'Content-Type': 'application/json'}
        }).then(result => {
            if(result.ok){
                alert("students deleted successfully");
                this.getStudents();
            } else {
                alert("students can't be deleted");
            }
        }).catch(err => {
            alert(JSON.parse(err.error));
        });

    }

    addUpdateStudent(studentCode, studentCodePrefix, source){
        let tempArray = this.state.students;

        if(source === "fromAddStudent"){
            if(this.state.studentButtonName === "Add Student"){
                if(this.state.studentCode === "" || this.state.studentName === "" || this.state.studentEmail === "" ||
                    this.state.studentPhone === "" || this.state.studentPassword === "" || this.state.studentCodePrefix === "") {
                    //Error Message
                    alert("Error message");
                } else {
                    let studentID = this.state.studentCodePrefix + this.state.studentCode;
                    if(tempArray !== []){
                        let breakCondition = false;
                        tempArray.map((item) => {
                            if((item.studentID === studentID) && !breakCondition){
                                //Error Message if ids are same
                                alert("Error message");
                                breakCondition = true;
                                return null;
                            }
                            return null;
                        });
                        if(!breakCondition){
                            let studentObj = {
                                studentID: studentID,
                                studentName: this.state.studentName ,
                                studentFaculty: this.state.studentFaculty,
                                studentDegree: this.state.studentDegree,
                                studentEmail: this.state.studentEmail,
                                studentPassword: this.state.studentPassword,
                                studentPhone: this.state.studentPhone,
                            };

                            this.addStudent(studentObj);
                            this.getStudents();
                        }
                    } else {
                        let studentObj = {
                            studentID: studentID,
                            studentName: this.state.studentName ,
                            studentFaculty: this.state.studentFaculty,
                            studentDegree: this.state.studentDegree,
                            studentEmail: this.state.studentEmail,
                            studentPassword: this.state.studentPassword,
                            studentPhone: this.state.studentPhone,
                        };

                        this.addStudent(studentObj);
                        this.getStudents();

                    }
                }
            } else if(this.state.studentButtonName === "Update Student") {
                let studentID = studentCodePrefix + studentCode;

                let studentObj = {
                    studentID: studentID,
                    studentName: this.state.studentName ,
                    studentFaculty: this.state.studentFaculty,
                    studentDegree: this.state.studentDegree,
                    studentEmail: this.state.studentEmail,
                    studentPassword: this.state.studentPassword,
                    studentPhone: this.state.studentPhone,
                };

                this.updateStudent(studentID, studentObj);

                this.setState({studentButtonName: "Add Student"});
            }

            this.setState({studentCodePrefix: ''});
            this.setState({studentCode: ''});
            this.setState({studentName: ''});
            this.setState({studentFaculty: ''});
            this.setState({studentDegree: ''});
            this.setState({studentEmail: ''});
            this.setState({studentPhone: ''});
            this.setState({studentPassword: ''});
        } else if(source === "fromEditStudent"){
            this.setState({studentButtonName: "Update Student"});

            this.getStudentByID(studentCode);
        }
    };

    getStudentByID = (studentID) => {
        fetch(nodeBasedUrl+"/admin/students/"+ studentID).then(res => {
            if(res.ok){
                return res.json();
            } else {
                alert("Error when obtaining the student information")
            }
        }).then(data => {
            this.setState({studentCodePrefix: data.studentID.substring(0,2)});
            this.setState({studentCode: data.studentID.substring(2)});
            this.setState({studentDegree: data.studentDegree});
            this.setState({studentFaculty: data.studentFaculty});
            this.setState({studentPhone: data.studentPhone});
            this.setState({studentName: data.studentName});
            this.setState({studentEmail: data.studentEmail});
            this.setState({studentPassword: data.studentPassword});
        }).catch(err => {
            console.log(err)
        })
    };

    addStudent = (obj) => {
        fetch(nodeBasedUrl+"/admin/students", {
            method: 'POST',
            body: JSON.stringify(obj),
            headers:{'Content-Type': 'application/json'}
        }).then(result => {
            if(result.ok){
                alert("student added successfully");
            } else {
                alert("The student can't be added");
            }
        }).catch(err => {
            alert(JSON.parse(err.error));
        });
    };

    updateStudent = (studentID,obj) => {
        fetch(nodeBasedUrl+"/admin/students"+ studentID, {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers:{'Content-Type': 'application/json'}
        }).then(result => {
            if(result.ok){
                alert("student updated successfully");
            } else {
                alert("The student can't be updated");
            }
        }).catch(err => {
            alert(JSON.parse(err.error));
        });
    };


    setFacultyAndDegrees(selectedString){
        if(selectedString !== "Select Faculty") {
            let array = selectedString.split(" ");
            this.setState({studentFaculty: array[0]});
            this.setState({studentCodePrefix: array[0]});
            this.getDegreeForFaculty(array[0]);
        }
    }

    setStudentDegree(selectedString){
        if(selectedString !== "Select Degree") {
            let array = selectedString.split(" ");
            this.setState({studentDegree: array[0]});
        }
    }

    render() {
        return (
            <div>
                <MDBCard>
                    <MDBCardHeader>Student Management</MDBCardHeader>
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
                                    <select className="browser-default custom-select" onChange={(e) => this.setStudentDegree(e.target.value)}>
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
                                <MDBCol md="2">
                                    <MDBInput disabled={"true"} label="Student Prefix" group type="text" validate name="studentIDPrefix" value={this.state.studentCodePrefix}
                                              onChange={(e) => this.setState({studentCodePrefix: e.target.value})}/>
                                </MDBCol>
                                <MDBCol>
                                    <MDBInput label="Student ID" group type="text" validate name="studentID" value={this.state.studentCode}
                                              onChange={(e) => this.setState({studentCode: e.target.value})}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <h4>Student username : <MDBBadge color="primary">{this.state.studentCodePrefix + this.state.studentCode}</MDBBadge>
                                    </h4>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <MDBInput label="Student Email" group type="email" validate name="studentEmail" value={this.state.studentEmail}
                                              onChange={(e) => this.setState({studentEmail: e.target.value})}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol><MDBInput label="Password" group type="password" validate name="studentPassword" value={this.state.studentPassword}
                                                  onChange={(e) => this.setState({studentPassword: e.target.value})}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <MDBInput label="Student Phone" group type="text" validate name="studentPhone" value={this.state.studentPhone}
                                              onChange={(e) => this.setState({studentPhone: e.target.value})}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol><MDBBtn color="primary" rounded type="button" className="z-depth-1a"
                                                onClick={() => this.addUpdateStudent(this.state.studentID, this.state.studentCodePrefix,"fromAddStudent")}>{this.state.studentButtonName}</MDBBtn></MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <MDBTable>
                                        <MDBTableHead>
                                            <tr>
                                                <th>Student ID</th>
                                                <th>Student Name</th>
                                                <th>Student Degree</th>
                                                <th>Student Faculty</th>
                                                <th>Student Email</th>
                                                <th>Student Phone</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            {this.state.students.map((student) => {
                                                return <tr key={student.studentID}>
                                                    <td>{student.studentID}</td>
                                                    <td>{student.studentName}</td>
                                                    <td>{student.studentDegree}</td>
                                                    <td>{student.studentFaculty}</td>
                                                    <td>{student.studentEmail}</td>
                                                    <td>{student.studentPhone}</td>
                                                    <td><MDBBtn color="primary" rounded type="button" className="z-depth-1a"
                                                                onClick={() => this.addUpdateStudent(student.studentID, "1","fromEditStudent")}>Edit</MDBBtn>{' '}
                                                        <MDBBtn color="danger" rounded type="button" className="z-depth-1a"
                                                                onClick={() => this.deleteStudent(student.studentID)}>Delete</MDBBtn>
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