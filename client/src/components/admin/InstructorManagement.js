import React, {Component} from 'react';
import {MDBBtn, MDBCol, MDBInput, MDBRow, MDBTable, MDBTableBody, MDBTableHead, MDBCard, MDBCardHeader, MDBCardBody} from 'mdbreact';
import config from "../functions/config";
import {getHash} from "../functions/Functions";

const nodeBaseUrl = config.nodeBaseUrl;
const springBaseUrl = config.springBaseUrl;

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

    getToken = () => {
        var user = localStorage.getItem('sis-user')
        if (user) {
            user = JSON.parse(user)
            return user.token
        }
        return null
    };

    componentDidMount() {
        this.setState({instructorButtonName: "Add Instructor"});
        //Fetch from back end and assign to faculties array from here
        this.getFaculties();
        this.getInstructors();
    }

    getFaculties = () => {
        let allFaculties = [];
        fetch(nodeBaseUrl+"/faculties", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.getToken()
            })
        }).then(res =>{
            if(res.ok){
                return res.json();
            } else {
                alert("Error when obtaining faculty")
            }
        }).then(data => {
            data.faculties.map((item) =>{
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

    getDegreeForFaculty = (facultyCode) => {
        let allDegrees = [];
        fetch(nodeBaseUrl+"/degrees", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.getToken()
            })
        }).then(res =>{
            if(res.ok){
                return res.json();
            } else {
                alert("Error when obtaining degrees")
            }
        }).then(data => {
            data.degrees.map((item) =>{
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
        fetch(springBaseUrl+"/users/roles/instructor", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.getToken()
            })
        }).then(res =>{
            if(res.ok){
                return res.json();
            } else {
                alert("Error when obtaining instructors");
            }
        }).then(data => {
            data.map((item) =>{
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

    deleteInstructor(id) {
        fetch(springBaseUrl+"/users/"+ id, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.getToken()
            })
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
                                "address": this.state.instructorAddress,
                                "firstName": this.state.instructorFirstName,
                                "lastName": this.state.instructorLastName,
                                "mobile": this.state.instructorPhone,
                                "email": this.state.instructorEmail,
                                "password": getHash(this.state.instructorPassword),
                                "roles": [{"role": "INSTRUCTOR"}],
                                "faculty": [this.state.instructorFaculty],
                                "degree": [this.state.instructorDegree],
                                "courses": [],
                                "nic": this.state.instructorNic
                            };

                            this.addInstructor(instructorObj);
                            setTimeout(() => {
                                this.getInstructors();
                            }, 5000);

                        }
                    } else {
                        let instructorObj = {
                            "address": this.state.instructorAddress,
                            "firstName": this.state.instructorFirstName,
                            "lastName": this.state.instructorLastName,
                            "mobile": this.state.instructorPhone,
                            "email": this.state.instructorEmail,
                            "password": getHash(this.state.instructorPassword),
                            "roles": [{"role": "INSTRUCTOR"}],
                            "faculty": [this.state.instructorFaculty],
                            "degree": [this.state.instructorDegree],
                            "courses": [],
                            "nic": this.state.instructorNic
                        };

                        this.addInstructor(instructorObj);
                        setTimeout(() => {
                            this.getInstructors();
                        }, 5000);
                    }
                }
            } else if(this.state.instructorButtonName === "Update Instructor") {
                let instructorObj = {
                    "address": this.state.instructorAddress,
                    "firstName": this.state.instructorFirstName,
                    "lastName": this.state.instructorLastName,
                    "mobile": this.state.instructorPhone,
                    "email": this.state.instructorEmail,
                    //"password": getHash(this.state.instructorPassword),
                    "roles": [{"role": "INSTRUCTOR"}],
                    "faculty": [this.state.instructorFaculty],
                    "degree": [this.state.instructorDegree],
                    "nic": this.state.instructorNic
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
        fetch(springBaseUrl+"/admin/instructors/"+ email, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.getToken()
            })
        }).then(res => {
            if(res.ok){
                return res.json();
            } else {
                alert("Error when obtaining the instructor information")
            }
        }).then(data => {
            this.setState({instructorFaculty: data.faculty});
            this.setState({instructorDegree: data.degree});
            this.setState({instructorFirstName: data.firstName});
            this.setState({instructorLastName: data.lastName});
            this.setState({instructorNic: data.nic});
            this.setState({instructorPhone: data.mobile});
            this.setState({instructorEmail: data.email});
            this.setState({instructorPassword: data.password});
            this.setState({instructorAddress: data.address});
        }).catch(err => {
            console.log(err)
        })
    };

    addInstructor = (obj) => {
        fetch(springBaseUrl+"/users", {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.getToken()
            })
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
        fetch(springBaseUrl+"/admin/instructors/"+ email, {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.getToken()
            })
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
            this.setState({instructorFaculty: array[0]}, () => {
                console.log(this.state.instructorFaculty);
                this.getDegreeForFaculty(this.state.instructorFaculty);
            });


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
                                <MDBCol><MDBInput  label="First Name" group type="text" validate name="instructorFirstName" value={this.state.instructorFirstName}
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
                                                    <td>
                                                        <MDBBtn color="danger" rounded type="button" className="z-depth-1a"
                                                                onClick={() => this.deleteInstructor(instructor.instructorID)}>Delete</MDBBtn>
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
                                                                onClick={() => this.addUpdateInstructor(instructor.instructorEmail, "fromEditInstructor")}>Edit</MDBBtn>{' '}*/