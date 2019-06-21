import React, {Component} from 'react';
import {MDBBtn, MDBCol, MDBInput, MDBRow, MDBTable, MDBTableBody, MDBTableHead, MDBCard, MDBCardHeader, MDBCardBody} from 'mdbreact';


export default class InstructorManagement extends Component {

    constructor(props) {
        super(props);
        this.state ={
            instructorFaculty: '',
            instructorDegree: '',
            instructorFirstName: '',
            instructorLastName: '',
            instructorNic: '',
            instructorPhone: '',
            instructorEmail: '',
            instructorPassword:'',
            instructorAddress: '',
            instructors: [],
            faculties: [],
            degrees: [],
            instructorButtonName: '',
            //lecturerPositionIndex: 0
        };
    }

    componentDidMount() {
        this.setState({instructorButtonName: "Add Instructor"});
        //Fetch from back end and assign to faculties array from here
        this.getFaculties();
        this.getInstructors();
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

    getInstructors = () => {
        let allInstructors = [];
        fetch("http://localhost:3001/admin/instructors").then(res =>{
            if(res.ok){
                return res.json();
            } else {
                alert("Error when obtaining instructors");
            }
        }).then(data => {
            data.map((item) =>{
                return allInstructors.push({
                    instructorFaculty: item.instructorFaculty,
                    instructorDegree: item.instructorDegree,
                    instructorFirstName: item.instructorFirstName,
                    instructorLastName: item.instructorLastName,
                    instructorNic: item.instructorNic,
                    instructorPhone: item.instructorPhone,
                    instructorEmail: item.instructorEmail,
                    instructorPassword: item.instructorPassword,
                    instructorAddress: item.instructorAddress
                })
            });
            this.setState({instructors: allInstructors})
        }).catch(err => {
            console.log(err)
        })
    };

    deleteInstructor(email) {
        fetch("http://localhost:3001/admin/instructors/"+ email, {
            method: 'DELETE',
            headers:{'Content-Type': 'application/json'}
        }).then(result => {
            if(result.ok){
                alert("Instructor deleted successfully");
                this.getInstructors();
            } else {
                alert("Instructor can't be deleted");
            }
        }).catch(err => {
            alert(JSON.parse(err.error));
        });

    }

    addUpdateInstructor(email, source){
        let tempArray = this.state.instructors;

        if(source === "fromAddInstructor"){
            if(this.state.instructorButtonName === "Add Instructor"){
                if( this.state.instructorFirstName === "" || this.state.instructorLastName === "" || this.state.instructorNic === "" ||  this.state.instructorAddress === "" ||
                    this.state.instructorPhone === "" || this.state.instructorEmail === "" || this.state.instructorPassword === "") {
                    //Error Message
                    alert("Error message");
                } else {
                    if(tempArray !== []){
                        let breakCondition = false;
                        tempArray.map((item) => {
                            if((item.instructorEmail === this.state.instructorEmail) && !breakCondition){
                                //Error Message if ids are same
                                alert("Error message");
                                breakCondition = true;
                                return null;
                            }
                            return null;
                        });
                        if(!breakCondition){
                            let instructorObj = {
                                instructorFaculty: this.state.instructorFaculty,
                                instructorDegree:  this.state.instructorDegree,
                                instructorFirstName:  this.state.instructorFirstName,
                                instructorLastName:  this.state.instructorLastName,
                                instructorNic:  this.state.instructorNic,
                                instructorPhone:  this.state.instructorPhone,
                                instructorEmail:  this.state.instructorEmail,
                                instructorPassword: this.state.instructorPassword,
                                instructorAddress:  this.state.instructorAddress
                            };

                            this.addInstructor(instructorObj);
                            this.getInstructors();
                        }
                    } else {
                        let instructorObj = {
                            instructorFaculty: this.state.instructorFaculty,
                            instructorDegree:  this.state.instructorDegree,
                            instructorFirstName:  this.state.instructorFirstName,
                            instructorLastName:  this.state.instructorLastName,
                            instructorNic:  this.state.instructorNic,
                            instructorPhone:  this.state.instructorPhone,
                            instructorEmail:  this.state.instructorEmail,
                            instructorPassword: this.state.instructorPassword,
                            instructorAddress:  this.state.instructorAddress
                        };

                        this.addInstructor(instructorObj);
                        this.getInstructors();
                    }
                }
            } else if(this.state.instructorButtonName === "Update Instructor") {
                let instructorObj = {
                    instructorFaculty: this.state.instructorFaculty,
                    instructorDegree:  this.state.instructorDegree,
                    instructorFirstName:  this.state.instructorFirstName,
                    instructorLastName:  this.state.instructorLastName,
                    instructorNic:  this.state.instructorNic,
                    instructorPhone:  this.state.instructorPhone,
                    instructorEmail:  this.state.instructorEmail,
                    instructorPassword: this.state.instructorPassword,
                    instructorAddress:  this.state.instructorAddress
                };

                this.updateInstructor(email, instructorObj);
                this.setState({instructorButtonName: "Add Instructor"});
            }

            this.setState({instructorFaculty: ''});
            this.setState({instructorDegree: ''});
            this.setState({instructorFirstName: ''});
            this.setState({instructorLastName: ''});
            this.setState({instructorNic: ''});
            this.setState({instructorPhone: ''});
            this.setState({instructorEmail: ''});
            this.setState({instructorPassword: ''});
            this.setState({instructorAddress: ''});
        } else if(source === "fromEditInstructor"){
            this.setState({instructorButtonName: "Update Instructor"});

            this.getInstructorByEmail(email)
        }
    };

    getInstructorByEmail = (email) => {
        fetch("http://localhost:3001/admin/instructors/"+ email).then(res => {
            if(res.ok){
                return res.json();
            } else {
                alert("Error when obtaining the instructor information")
            }
        }).then(data => {
            this.setState({instructorFaculty: data.instructorFaculty});
            this.setState({instructorDegree: data.instructorDegree});
            this.setState({instructorFirstName: data.instructorFirstName});
            this.setState({instructorLastName: data.instructorLastName});
            this.setState({instructorNic: data.instructorNic});
            this.setState({instructorPhone: data.instructorPhone});
            this.setState({instructorEmail: data.instructorEmail});
            this.setState({instructorPassword: data.instructorPassword});
            this.setState({instructorAddress: data.instructorAddress});
        }).catch(err => {
            console.log(err)
        })
    };

    addInstructor = (obj) => {
        fetch("http://localhost:3001/admin/instructors", {
            method: 'POST',
            body: JSON.stringify(obj),
            headers:{'Content-Type': 'application/json'}
        }).then(result => {
            if(result.ok){
                alert("Instructor added successfully");
            } else {
                alert("The Instructor can't be added");
            }
        }).catch(err => {
            alert(JSON.parse(err.error));
        });
    };

    updateInstructor = (email,obj) => {
        fetch("http://localhost:3001/admin/instructors/"+ email, {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers:{'Content-Type': 'application/json'}
        }).then(result => {
            if(result.ok){
                alert("Instructor updated successfully");
            } else {
                alert("The Instructor can't be updated");
            }
        }).catch(err => {
            alert(JSON.parse(err.error));
        });
    };


    setFacultyAndDegrees(selectedString){
        if(selectedString !== "Select Faculty") {
            let array = selectedString.split(" ");
            this.setState({instructorFaculty: array[0]});
            this.getDegreeForFaculty(array[0]);
        }
    }

    setInstructorDegree(selectedString){
        if(selectedString !== "Select Degree") {
            let array = selectedString.split(" ");
            this.setState({instructorDegree: array[0]});
        }
    }

    render() {
        return (
            <div>
                <MDBCard>
                    <MDBCardHeader>Instructor Management</MDBCardHeader>
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
                                    <select className="browser-default custom-select" onChange={(e) => this.setInstructorDegree(e.target.value)}>
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
                                <MDBCol><MDBInput label="First Name" group type="text" validate name="instructorFirstName" value={this.state.instructorFirstName}
                                                  onChange={(e) => this.setState({instructorFirstName: e.target.value})}/>
                                </MDBCol>
                                <MDBCol><MDBInput label="Last Name" group type="text" validate name="instructorLastName" value={this.state.instructorLastName}
                                                  onChange={(e) => this.setState({instructorLastName: e.target.value})}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol><MDBInput label="Nic" group type="text" validate name="instructorNic" value={this.state.instructorNic}
                                                  onChange={(e) => this.setState({instructorNic: e.target.value})}/>
                                </MDBCol>
                                <MDBCol>
                                    <MDBInput label="Phone" group type="text" validate name="instructorPhone" value={this.state.instructorPhone}
                                              onChange={(e) => this.setState({instructorPhone: e.target.value})}/>
                                </MDBCol>

                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <MDBInput label="Email" group type="email" validate name="instructorEmail" value={this.state.instructorEmail}
                                              onChange={(e) => this.setState({instructorEmail: e.target.value})}/>
                                </MDBCol>
                                <MDBCol><MDBInput label="Password" group type="password" validate name="instructorPassword" value={this.state.instructorPassword}
                                                  onChange={(e) => this.setState({instructorPassword: e.target.value})}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <MDBInput type="textarea" label="Description" name="instructorAddress" value={this.state.instructorAddress} onChange={(e) => this.setState({instructorAddress: e.target.value})} outline />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol><MDBBtn color="primary" rounded type="button" className="z-depth-1a"
                                                onClick={() => this.addUpdateInstructor(this.state.instructorEmail, "fromAddInstructor")}>{this.state.instructorButtonName}</MDBBtn></MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <MDBTable>
                                        <MDBTableHead>
                                            <tr>
                                                <th>Instructor First Name</th>
                                                <th>Instructor Last Name</th>
                                                <th>Instructor Faculty</th>
                                                <th>Instructor Degree</th>
                                                <th>Instructor Nic</th>
                                                <th>Instructor Phone</th>
                                                <th>Instructor Email</th>
                                                <th>Instructor Address</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            {this.state.instructors.map((instructor) => {
                                                return <tr key={instructor.instructorEmail}>
                                                    <td>{instructor.instructorFirstName}</td>
                                                    <td>{instructor.instructorLastName}</td>
                                                    <td>{instructor.instructorFaculty}</td>
                                                    <td>{instructor.instructorDegree}</td>
                                                    <td>{instructor.instructorNic}</td>
                                                    <td>{instructor.instructorPhone}</td>
                                                    <td>{instructor.instructorEmail}</td>
                                                    <td>{instructor.instructorAddress}</td>
                                                    <td><MDBBtn color="primary" rounded type="button" className="z-depth-1a"
                                                                onClick={() => this.addUpdateInstructor(instructor.instructorEmail, "fromEditInstructor")}>Edit</MDBBtn>{' '}
                                                        <MDBBtn color="danger" rounded type="button" className="z-depth-1a"
                                                                onClick={() => this.deleteInstructor(instructor.instructorEmail)}>Delete</MDBBtn>
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