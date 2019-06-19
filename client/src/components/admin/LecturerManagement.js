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
    }

    deleteLecturer(value) {
        let tempArray = this.state.courses;

        tempArray = tempArray.filter(obj => obj.degreeID !== value);
        this.setState({courses: tempArray});
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
                            tempArray.push({lecturerID: lecturerID, lecturerPrefix: this.state.lecturerIDPrefix ,lecturerName: this.state.lecturerName , lecturerEmail: this.state.lecturerEmail, lecturerPhone: this.state.lecturerPhone, lecturerUsername: this.state.lecturerUsername, lecturerPassword: this.state.lecturerPassword});
                            this.setState({lecturers: tempArray});
                        }
                    } else {
                        tempArray.push({lecturerID: lecturerID, lecturerPrefix: this.state.lecturerIDPrefix ,lecturerName: this.state.lecturerName , lecturerEmail: this.state.lecturerEmail, lecturerPhone: this.state.lecturerPhone, lecturerUsername: this.state.lecturerUsername, lecturerPassword: this.state.lecturerPassword});
                        this.setState({lecturers: tempArray});
                    }
                }
            } else if(this.state.lecturerButtonName === "Update Lecturer") {
                tempArray[this.state.lecturerPositionIndex].lecturerPrefix = this.state.lecturerIDPrefix;
                tempArray[this.state.lecturerPositionIndex].lecturerID = this.state.lecturerIDPrefix + this.state.lecturerID;
                tempArray[this.state.lecturerPositionIndex].lecturerName = this.state.lecturerName;
                tempArray[this.state.lecturerPositionIndex].lecturerEmail = this.state.lecturerEmail;
                tempArray[this.state.lecturerPositionIndex].lecturerPhone = this.state.lecturerPhone;
                tempArray[this.state.lecturerPositionIndex].lecturerPassword = this.state.lecturerPassword;

                this.setState({lecturers: tempArray});
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

            let breakCondition = false;
            tempArray.map((item, index) => {
                if(item.degreeID === value && !breakCondition){
                    this.setState({degreePositionIndex: index});
                    breakCondition = true;
                    return null;
                }
                return null;
            });
            console.log(value);
            let lecturerObj = tempArray.filter(obj => obj.lecturerID === value);
            if(lecturerObj.length > 0){
                this.setState({lecturerIDPrefix: lecturerObj[0].lecturerIDPrefix});
                this.setState({lecturerID: lecturerObj[0].lecturerID.substring(2)});
                this.setState({lecturerName: lecturerObj[0].lecturerName});
                this.setState({lecturerEmail: lecturerObj[0].lecturerEmail});
                this.setState({lecturerUsername: lecturerObj[0].lecturerUsername});
                this.setState({lecturerPassword: lecturerObj[0].lecturerPassword});
            } else {
                alert("Error");
            }
        }
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