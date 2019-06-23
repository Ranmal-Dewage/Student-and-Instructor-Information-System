import React, {Component} from 'react';
import {MDBBtn, MDBCol, MDBInput, MDBRow, MDBTable, MDBTableBody, MDBTableHead, MDBCard, MDBCardHeader, MDBCardBody, MDBBadge} from 'mdbreact';


export default class LecturerManagement extends Component {

    constructor(props) {
        super(props);
        this.state ={
            lecturerIDPrefix: '',
            lecturerID: '',
            lecturerName: '',
            lecturerEmail: '',
            lecturerPhone: '',
            lecturerFaculty: '',
            lecturerUsername: '',
            lecturerPassword:'',
            faculties: [],
            lecturers: [],
            lecturerButtonName: '',
            lecturerPositionIndex: 0
        };
    }

    componentDidMount() {
        this.setState({lecturerButtonName: "Add Lecturer"});
        //Fetch from back end and assign to faculties array from here
        this.getFaculties();
        this.getLecturers();
    }

    getFaculties = () => {
        let allFaculties = [];
        fetch("http://localhost:3001/admin/faculties").then(res =>{
            if(res.ok){
                return res.json();
            } else {
                alert("Error when obtaining lecturers")
            }
        }).then(data => {
            data.map((item) =>{
                return allFaculties.push({facultyPrefix: item.facultyPrefix, facultyID: item.facultyID, facultyName: item.facultyName, degrees: item.degrees, facultyDescription: item.facultyDescription})
            });
            this.setState({faculties: allFaculties})
        }).catch(err => {
            console.log(err)
        })
    };

    getLecturers = () => {
        let allLecturers = [];
        fetch("http://localhost:3001/admin/lecturers").then(res =>{
            if(res.ok){
                return res.json();
            } else {
                alert("Error when obtaining lecturers")
            }
        }).then(data => {
            data.map((item) =>{
                return allLecturers.push({lecturerID: item.lecturerID, lecturerPrefix: item.lecturerIDPrefix ,lecturerName: item.lecturerName , lecturerEmail: item.lecturerEmail, lecturerPhone: item.lecturerPhone, lecturerUsername: item.lecturerUsername, lecturerPassword: item.lecturerPassword})
            });
            this.setState({lecturers: allLecturers})
        }).catch(err => {
            console.log(err)
        })
    };

    deleteLecturer(value) {
        fetch("http://localhost:3001/admin/lecturers/"+ value, {
            method: 'DELETE',
            headers:{'Content-Type': 'application/json'}
        }).then(result => {
            if(result.ok){
                alert("lecturer deleted successfully");
                this.getLecturers();
            } else {
                alert("lecturer can't be deleted");
            }
        }).catch(err => {
            alert(JSON.parse(err.error));
        });

    }

    addUpdateLecturer(value, prefix, source){
        let tempArray = this.state.lecturers;

        if(source === "fromAddLecturer"){
            if(this.state.lecturerButtonName === "Add Lecturer"){
                if(this.state.lecturerID === "" || this.state.lecturerName === "" || this.state.lecturerEmail === "" || this.state.lecturerPassword === "" || this.state.lecturerIDPrefix === "" || this.state.lecturerPhone === "") {
                    //Error Message
                    alert("Error message");
                } else {
                    let lecturerID = this.state.lecturerIDPrefix + this.state.lecturerID;
                    this.setState({lecturerUsername: this.state.lecturerIDPrefix + this.state.lecturerID});
                    if(tempArray !== []){
                        let breakCondition = false;
                        tempArray.map((item) => {
                            if((item.lecturerID === lecturerID) && !breakCondition){
                                //Error Message if ids are same
                                alert("Error message");
                                breakCondition = true;
                                return null;
                            }
                            return null;
                        });
                        if(!breakCondition){
                            let lectureObj = {
                                lecturerID: lecturerID,
                                lecturerPrefix: this.state.lecturerIDPrefix ,
                                lecturerName: this.state.lecturerName ,
                                lecturerEmail: this.state.lecturerEmail,
                                lecturerPhone: this.state.lecturerPhone,
                                lecturerUsername: this.state.lecturerUsername,
                                lecturerPassword: this.state.lecturerPassword
                            };

                            this.addLecturer(lectureObj);
                            this.getLecturers();
                            //tempArray.push({lecturerID: lecturerID, lecturerPrefix: this.state.lecturerIDPrefix ,lecturerName: this.state.lecturerName , lecturerEmail: this.state.lecturerEmail, lecturerPhone: this.state.lecturerPhone, lecturerUsername: this.state.lecturerUsername, lecturerPassword: this.state.lecturerPassword});
                            //this.setState({lecturers: tempArray});
                        }
                    } else {
                        let lectureObj = {
                            lecturerID: lecturerID,
                            lecturerPrefix: this.state.lecturerIDPrefix ,
                            lecturerName: this.state.lecturerName ,
                            lecturerEmail: this.state.lecturerEmail,
                            lecturerPhone: this.state.lecturerPhone,
                            lecturerUsername: this.state.lecturerUsername,
                            lecturerPassword: this.state.lecturerPassword
                        };

                        this.addLecturer(lectureObj);
                        this.getLecturers();
                        //tempArray.push({lecturerID: lecturerID, lecturerPrefix: this.state.lecturerIDPrefix ,lecturerName: this.state.lecturerName , lecturerEmail: this.state.lecturerEmail, lecturerPhone: this.state.lecturerPhone, lecturerUsername: this.state.lecturerUsername, lecturerPassword: this.state.lecturerPassword});
                        //this.setState({lecturers: tempArray});
                    }
                }
            } else if(this.state.lecturerButtonName === "Update Lecturer") {
                let lecturerID = this.state.lecturerIDPrefix + this.state.lecturerID;

                let lectureObj = {
                    lecturerID: lecturerID,
                    lecturerPrefix: this.state.lecturerIDPrefix ,
                    lecturerName: this.state.lecturerName ,
                    lecturerEmail: this.state.lecturerEmail,
                    lecturerPhone: this.state.lecturerPhone,
                    lecturerUsername: this.state.lecturerUsername,
                    lecturerPassword: this.state.lecturerPassword
                };

                //tempArray[this.state.lecturerPositionIndex].lecturerPrefix = this.state.lecturerIDPrefix;
                //tempArray[this.state.lecturerPositionIndex].lecturerID = this.state.lecturerIDPrefix + this.state.lecturerID;
                //tempArray[this.state.lecturerPositionIndex].lecturerName = this.state.lecturerName;
                //tempArray[this.state.lecturerPositionIndex].lecturerEmail = this.state.lecturerEmail;
                //tempArray[this.state.lecturerPositionIndex].lecturerPhone = this.state.lecturerPhone;
                //tempArray[this.state.lecturerPositionIndex].lecturerPassword = this.state.lecturerPassword;

                this.updateLecturer(lecturerID, lectureObj);

                //this.setState({lecturers: tempArray});
                //Degree is updated here send changes from here
                this.setState({lecturerButtonName: "Add Lecturer"});
            }

            this.setState({lecturerIDPrefix: ''});
            this.setState({lecturerID: ''});
            this.setState({lecturerName: ''});
            this.setState({lecturerEmail: ''});
            this.setState({lecturerUsername: ''});
            this.setState({lecturerPassword: ''});
        } else if(source === "fromEditLecturer"){
            this.setState({lecturerButtonName: "Update Lecturer"});

            this.getLecturerByID(value)
            //let breakCondition = false;
            //tempArray.map((item, index) => {
                //if(item.lecturerID === value && !breakCondition){
                   // this.setState({lecturerPositionIndex: index});
                   // breakCondition = true;
                   // return null;
               // }
               // return null;
            //});
            //console.log(value);
            //let lecturerObj = tempArray.filter(obj => obj.lecturerID === value);
            //if(lecturerObj.length > 0){
               // this.setState({lecturerIDPrefix: lecturerObj[0].lecturerIDPrefix});
               // this.setState({lecturerID: lecturerObj[0].lecturerID.substring(2)});
               // this.setState({lecturerName: lecturerObj[0].lecturerName});
               // this.setState({lecturerEmail: lecturerObj[0].lecturerEmail});
               // this.setState({lecturerUsername: lecturerObj[0].lecturerUsername});
               // this.setState({lecturerPassword: lecturerObj[0].lecturerPassword});
            //} else {
               // alert("Error");
           // }
        }
    };

    getLecturerByID = (lecturerID) => {
        fetch("http://localhost:3001/admin/lecturers/"+ lecturerID).then(res => {
            if(res.ok){
                return res.json();
            } else {
                alert("Error when obtaining the lecturer information")
            }
        }).then(data => {
            this.setState({lecturerIDPrefix: data.lecturerIDPrefix});
            this.setState({lecturerID: data.lecturerID.substring(2)});
            this.setState({lecturerName: data.lecturerName});
            this.setState({lecturerEmail: data.lecturerEmail});
            this.setState({lecturerUsername: data.lecturerUsername});
            this.setState({lecturerPassword: data.lecturerPassword});
        }).catch(err => {
            console.log(err)
        })
    };

    addLecturer = (obj) => {
        fetch("http://localhost:3001/admin/lecturers", {
            method: 'POST',
            body: JSON.stringify(obj),
            headers:{'Content-Type': 'application/json'}
        }).then(result => {
            if(result.ok){
                alert("lecturer added successfully");
            } else {
                alert("The lecturer can't be added");
            }
        }).catch(err => {
            alert(JSON.parse(err.error));
        });
    };

    updateLecturer = (id,obj) => {
        fetch("http://localhost:3001/admin/lecturers"+ id, {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers:{'Content-Type': 'application/json'}
        }).then(result => {
            if(result.ok){
                alert("lecturer updated successfully");
            } else {
                alert("The lecturer can't be updated");
            }
        }).catch(err => {
            alert(JSON.parse(err.error));
        });
    };


    setPrefix(value){
        let array = value.split(" ");
        this.setState({lecturerPrefix: array[0]});
    }

    render() {
        return (
            <div>
                <MDBCard>
                    <MDBCardHeader>Lecturer Management</MDBCardHeader>
                    <MDBCardBody>
                        <form>
                            <MDBRow>
                                <MDBCol>
                                    <select className="browser-default custom-select" onChange={(e) => this.setPrefix(e.target.value)}>
                                        <option disabled>Choose the faculty the lecturer belong to</option>
                                            {this.state.faculties.map((faculty) => {
                                                return <option>
                                                    {faculty.facultyPrefix + " " + faculty.facultyName}
                                                </option>
                                            })}
                                    </select>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="2">
                                    <MDBInput disabled={"true"} label="Lecturer Prefix" group type="text" validate name="lecturerPrefix" value={this.state.lecturerPrefix}
                                              onChange={(e) => this.setState({lecturerPrefix: e.target.value})}/>
                                </MDBCol>
                                <MDBCol>
                                    <MDBInput label="Lecturer ID" group type="text" validate name="lecturerID" value={this.state.lecturerID}
                                              onChange={(e) => this.setState({lecturerID: e.target.value})}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <h3>Lecturer username : <MDBBadge color="primary">{this.state.lecturerPrefix + this.state.lecturerID}</MDBBadge>
                                    </h3>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol><MDBInput label="Password" group type="password" validate name="lecturerPassword" value={this.state.lecturerPassword}
                                                  onChange={(e) => this.setState({lecturerPassword: e.target.value})}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <MDBInput label="Lecturer Email" group type="email" validate name="lecturerEmail" value={this.state.lecturerEmail}
                                              onChange={(e) => this.setState({lecturerEmail: e.target.value})}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <MDBInput label="Lecturer Phone" group type="text" validate name="lecturerPhone" value={this.state.lecturerPhone}
                                              onChange={(e) => this.setState({lecturerPhone: e.target.value})}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol><MDBBtn color="primary" rounded type="button" className="z-depth-1a"
                                                onClick={() => this.addUpdateLecturer(this.state.lecturerID, this.state.lecturerIDPrefix,"fromAddLecturer")}>{this.state.lecturerButtonName}</MDBBtn></MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <MDBTable>
                                        <MDBTableHead>
                                            <tr>
                                                <th>Lecturer ID</th>
                                                <th>Lecturer Name</th>
                                                <th>Lecturer Username</th>
                                                <th>Lecturer Email</th>
                                                <th>Lecturer Phone</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            {this.state.lecturers.map((lecturer) => {
                                                return <tr key={lecturer.lecturerID}>
                                                    <td>{lecturer.lecturerID}</td>
                                                    <td>{lecturer.lecturerName}</td>
                                                    <td>{lecturer.lecturerUsername}</td>
                                                    <td>{lecturer.lecturerEmail}</td>
                                                    <td>{lecturer.lecturerPhone}</td>
                                                    <td><MDBBtn color="primary" rounded type="button" className="z-depth-1a"
                                                                onClick={() => this.addUpdateLecturer(lecturer.lecturerID, this.state.lecturerIDPrefix,"fromEditLecturer")}>Edit</MDBBtn>{' '}
                                                        <MDBBtn color="danger" rounded type="button" className="z-depth-1a"
                                                                onClick={() => this.deleteLecturer(lecturer.facultyID)}>Delete</MDBBtn>
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