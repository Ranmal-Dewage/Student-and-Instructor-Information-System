import React, {Component} from 'react';
import {MDBBtn, MDBCol, MDBInput, MDBRow, MDBTable, MDBTableBody, MDBTableHead, MDBCard, MDBCardHeader, MDBCardBody} from 'mdbreact';


export default class FacultyManagement extends Component {

    constructor(props) {
        super(props);
        this.state ={
            facultyPrefix: '',
            facultyID: '',
            facultyName: '',
            degreePrefix: '',
            degreeID: '',
            degreeName: '',
            degrees: [],
            degreeButtonName: '',
            facultyButtonName: '',
            degreePositionIndex: 0,
            facultyPositionIndex: 0,
            facultyDescription: '',
            degreeDescription: '',
            faculties: []
        };
    }

    componentDidMount() {
        this.setState({degreeButtonName: "Add Degree"});
        this.setState({facultyButtonName: "Add Faculty"});
        //Fetch from back end and assign to faculties array from here
    }

    deleteDegree(value) {
        let tempArray = this.state.degrees;

        tempArray = tempArray.filter(obj => obj.degreeID !== value);
        this.setState({degrees: tempArray});
    }

    deleteFaculty(value) {
        let tempArray = this.state.faculties;

        tempArray = tempArray.filter(obj => obj.facultyID !== value);
        this.setState({faculties: tempArray});
    }

    addUpdateDegree(value, prefix, source){
        let tempArray = this.state.degrees;

        if(source === "fromAddDegree"){
            if(this.state.degreeButtonName === "Add Degree"){
                if(this.state.degreeID === "" || this.state.degreeName === "" || this.state.degreePrefix === "") {
                    //Error Message
                    alert("Error message");
                } else {
                    let degreeID = this.state.degreePrefix + this.state.degreeID;
                    console.log(degreeID);
                    if(tempArray !== []){
                        let breakCondition = false;
                        tempArray.map((item) => {
                            if((item.degreeID === degreeID) && !breakCondition){
                                //Error Message if ids are same
                                alert("Error message");
                                breakCondition = true;
                                return null;
                            } else if((item.degreeName === this.state.degreeName) && !breakCondition){
                                //Error message if degree names are same
                                alert("Error message");
                                breakCondition = true;
                                return null;
                            }
                            return null;
                        });
                        if(!breakCondition){
                            tempArray.push({facultyID: this.state.facultyID ,degreeID: degreeID, degreePrefix: this.state.degreePrefix ,degreeName: this.state.degreeName, degreeDescription: this.state.degreeDescription});
                            this.setState({degrees: tempArray});
                        }
                    } else {
                        tempArray.push({facultyID: this.state.facultyID ,degreeID: degreeID, degreePrefix: this.state.degreePrefix  ,degreeName: this.state.degreeName,  degreeDescription: this.state.degreeDescription});
                        this.setState({degrees: tempArray});
                    }
                }
            } else if(this.state.degreeButtonName === "Update Degree") {
                tempArray[this.state.degreePositionIndex].degreePrefix = this.state.degreePrefix;
                tempArray[this.state.degreePositionIndex].degreeID = this.state.degreePrefix + this.state.degreeID;
                tempArray[this.state.degreePositionIndex].degreeName = this.state.degreeName;
                tempArray[this.state.degreePositionIndex].degreeDescription = this.state.degreeDescription;

                this.setState({degrees: tempArray});
                //Degree is updated here send changes from here
                this.setState({degreeButtonName: "Add Degree"});
            }

            this.setState({degreeDescription: ''});
            this.setState({degreePrefix: ''});
            this.setState({degreeID: ''});
            this.setState({degreeName: ''});
        } else if(source === "fromEditDegree"){
            this.setState({degreeButtonName: "Update Degree"});

            let breakCondition = false;
            tempArray.map((item, index) => {
                if(item.degreeID === value && !breakCondition){
                    this.setState({degreePositionIndex: index});
                    breakCondition = true;
                    return null;
                }
                return null;
            });

            let degreeObj = tempArray.filter(obj => obj.degreeID === value);
            if(degreeObj.length > 0){
                this.setState({degreePrefix: degreeObj[0].degreePrefix});
                this.setState({degreeID: degreeObj[0].degreeID.substring(2)});
                this.setState({degreeName: degreeObj[0].degreeName});
                this.setState({degreeDescription: degreeObj[0].degreeDescription});
            } else {
                alert("Error");
            }
        }
    };

    addUpdateFaculty(value, prefix, source){
        let tempArray = this.state.faculties;

        if(source === "fromAddFaculty"){
            if(this.state.facultyButtonName === "Add Faculty"){
                if(this.state.facultyID === "" || this.state.facultyName === "" || this.state.facultyPrefix === "") {
                    //Error Message
                    alert("Error message NIl");
                } else {
                    let facultyID = this.state.facultyPrefix + this.state.facultyID;
                    if(tempArray !== []){
                        let breakCondition = false;
                        tempArray.map((item) => {
                            if((item.facultyID === this.state.facultyID) && !breakCondition){
                                //Error Message if ids are same
                                alert("Error message SIMILAR IDS");
                                breakCondition = true;
                                return null;
                            } else if((item.facultyName === this.state.facultyName) && !breakCondition){
                                //Error message if degree names are same
                                alert("Error message SIMILAR NAMES");
                                breakCondition = true;
                                return null;
                            }
                            return null;
                        });
                        if(!breakCondition){

                            tempArray.push({facultyPrefix: this.state.facultyPrefix, facultyID: facultyID, facultyName: this.state.facultyName,degrees: this.state.degrees, facultyDescription: this.state.facultyDescription});
                            this.setState({faculties: tempArray});
                            //Update both degree and faculty tables from here using faculties and degrees arrays
                        }
                    } else {

                        tempArray.push({facultyPrefix: this.state.facultyPrefix, facultyID: facultyID, facultyName: this.state.facultyName,degrees: this.state.degrees, facultyDescription: this.state.facultyDescription});
                        this.setState({faculties: tempArray});
                        //Update Initial push of both degree and faculty tables from here using faculties and degrees arrays
                    }
                }
            } else if(this.state.facultyButtonName === "Update Faculty") {
                //Changes the updated values
                tempArray[this.state.facultyPositionIndex].facultyPrefix = this.state.facultyPrefix;
                tempArray[this.state.facultyPositionIndex].facultyID = this.state.facultyPrefix + this.state.facultyID;
                tempArray[this.state.facultyPositionIndex].facultyName = this.state.facultyName;
                tempArray[this.state.facultyPositionIndex].degrees = this.state.degrees;
                tempArray[this.state.facultyPositionIndex].facultyDescription = this.state.facultyDescription;

                this.setState({faculties: tempArray});
                //Send the edited faculty array to backend from here
                this.setState({facultyButtonName: "Add Faculty"});
            }

            this.setState({facultyPrefix: ''});
            this.setState({facultyID: ''});
            this.setState({facultyName: ''});
            this.setState({degrees: []});
            this.setState({facultyDescription: ''});
        } else if(source === "fromEditFaculty"){
            this.setState({facultyButtonName: "Update Faculty"});
            let facultyID = prefix + value;
            console.log(facultyID);
            let breakCondition = false;
            tempArray.map((item, index) => {
                if(item.facultyID === facultyID && !breakCondition){
                    this.setState({facultyPositionIndex: index});
                    breakCondition = true;
                    return null;
                }
                return null;
            });

            let facultyObj = tempArray.filter(obj => obj.facultyID === facultyID);
            if(facultyObj.length > 0){
                this.setState({facultyPrefix: facultyObj[0].facultyPrefix});
                this.setState({facultyID: facultyObj[0].facultyID.substring(2)});
                this.setState({facultyName: facultyObj[0].facultyName});
                this.setState({degreeID: facultyObj[0].degreeID});
                this.setState({degreeName: facultyObj[0].degreeName});
                this.setState({degrees: facultyObj[0].degrees});
                this.setState({facultyDescription: facultyObj[0].facultyDescription});
            } else {
                alert("Error");
            }
        }
    }

    render() {
        return (
            <div>
                <MDBCard>
                    <MDBCardHeader>Faculty Management</MDBCardHeader>
                    <MDBCardBody>
                        <form>
                            <MDBRow>
                                <MDBCol>
                                    <MDBInput label="Faculty Prefix" group type="text" validate name="facultyPrefix" value={this.state.facultyPrefix}
                                              onChange={(e) => this.setState({facultyPrefix: e.target.value})}/>
                                </MDBCol>
                                <MDBCol>
                                    <MDBInput label="Faculty ID" group type="text" validate name="facultyID" value={this.state.facultyID}
                                              onChange={(e) => this.setState({facultyID: e.target.value})}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol><MDBInput label="Faculty Name" group type="text" validate name="facultyName" value={this.state.facultyName}
                                                  onChange={(e) => this.setState({facultyName: e.target.value})}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <MDBInput type="textarea" label="Faculty Description" name="facultyDescription" value={this.state.facultyDescription} onChange={(e) => this.setState({facultyDescription: e.target.value})} outline />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol><MDBInput label="Degree Prefix" group type="text" validate name="degreePrefix"
                                                  value={this.state.degreePrefix}
                                                  onChange={(e) => this.setState({degreePrefix: e.target.value})}/></MDBCol>
                                <MDBCol><MDBInput label="Degree ID" group type="text" validate name="degreeID"
                                                  value={this.state.degreeID}
                                                  onChange={(e) => this.setState({degreeID: e.target.value})}/></MDBCol>
                                <MDBCol><MDBInput label="Degree Name" group type="text" validate name="degreeName"
                                                  value={this.state.degreeName}
                                                  onChange={(e) => this.setState({degreeName: e.target.value})}/>
                                </MDBCol>

                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <MDBInput type="textarea" label="Degree Description" name="degreeDescription" value={this.state.degreeDescription} onChange={(e) => this.setState({degreeDescription: e.target.value})} outline />
                                </MDBCol>
                                <MDBCol><MDBBtn color="primary" rounded type="button" className="z-depth-1a"
                                                onClick={() => this.addUpdateDegree(this.state.degreeID, this.state.degreePrefix,"fromAddDegree")}>{this.state.degreeButtonName}</MDBBtn>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBTable>
                                    <MDBTableHead>
                                        <tr>
                                            <th>Degree ID</th>
                                            <th>Degree Name</th>
                                            <th>Degree Description</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {this.state.degrees.map((degree) => {
                                            return <tr key={degree.degreeID}>
                                                <td>{degree.degreeID}</td>
                                                <td>{degree.degreeName}</td>
                                                <td>{degree.degreeDescription}</td>
                                                <td><MDBBtn color="primary" rounded type="button" className="z-depth-1a"
                                                            onClick={() => this.addUpdateDegree(degree.degreeID, degree.degreePrefix ,"fromEditDegree")}>Edit</MDBBtn>{' '}
                                                    <MDBBtn color="danger" rounded type="button" className="z-depth-1a"
                                                            onClick={() => this.deleteDegree(degree.degreeID)}>Delete</MDBBtn>
                                                </td>
                                            </tr>
                                        })}
                                    </MDBTableBody>
                                </MDBTable>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol><MDBBtn color="primary" rounded type="button" className="z-depth-1a"
                                                onClick={() => this.addUpdateFaculty(this.state.facultyID, this.state.facultyPrefix,"fromAddFaculty")}>{this.state.facultyButtonName}</MDBBtn></MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBTable>
                                    <MDBTableHead>
                                        <tr>
                                            <th>Faculty ID</th>
                                            <th>Faculty Name</th>
                                            <th>Degrees</th>
                                            <th>Faculty Description</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {this.state.faculties.map((faculty) => {
                                            return <tr key={faculty.facultyID}>
                                                <td>{faculty.facultyID}</td>
                                                <td>{faculty.facultyName}</td>
                                                <td>
                                                    <MDBTable>
                                                        <MDBTableHead>
                                                            <tr>
                                                                <th>Degree ID</th>
                                                                <th>Degree Name</th>
                                                            </tr>
                                                        </MDBTableHead>
                                                        <MDBTableBody>
                                                            {faculty.degrees.map((degree) => {
                                                                return <tr key={degree.degreeID}>
                                                                    <td>{degree.degreeID}</td>
                                                                    <td>{degree.degreeName}</td>
                                                                    <td>{degree.degreeDescription}</td>
                                                                </tr>
                                                            })}
                                                        </MDBTableBody>
                                                    </MDBTable>
                                                </td>
                                                <td>{faculty.facultyDescription}</td>
                                                <td><MDBBtn color="primary" rounded type="button" className="z-depth-1a"
                                                            onClick={() => this.addUpdateFaculty(faculty.facultyID, this.state.facultyPrefix,"fromEditFaculty")}>Edit</MDBBtn>{' '}
                                                    <MDBBtn color="danger" rounded type="button" className="z-depth-1a"
                                                            onClick={() => this.deleteFaculty(faculty.facultyID)}>Delete</MDBBtn>
                                                </td>
                                            </tr>
                                        })}
                                    </MDBTableBody>
                                </MDBTable>
                            </MDBRow>
                        </form>
                    </MDBCardBody>
                </MDBCard>
           </div>
    );
    }
}