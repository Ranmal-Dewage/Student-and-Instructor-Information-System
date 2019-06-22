import React, {Component} from 'react';
import {MDBBtn, MDBCol, MDBInput, MDBRow, MDBTable, MDBTableBody, MDBTableHead, MDBCard, MDBCardHeader, MDBCardBody} from 'mdbreact';

const nodeBasedUrl = "http://192.168.8.104:4000";

export default class FacultyManagement extends Component {

    constructor(props) {
        super(props);
        this.state ={
            facultyCode: '',
            facultyName: '',
            facultyDescription: '',
            degreeCode: '',
            degreeName: '',
            degreeDescription: '',
            degreeButtonName: '',
            facultyButtonName: '',
            degrees: [],
            faculties: []
        };
    }

    componentDidMount() {
        this.setState({degreeButtonName: "Add Degree"});
        this.setState({facultyButtonName: "Add Faculty"});
        //Fetch from back end and assign to faculties array from here
        this.getFaculties();
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

    getDegrees = () => {
        let allDegrees = [];
        fetch(nodeBasedUrl+"/admin/faculties/degrees").then(res =>{
            if(res.ok){
                return res.json();
            } else {
                alert("Error when obtaining degrees")
            }
        }).then(data => {
            data.map((item) =>{
                return allDegrees.push({
                    facultyCode: item.facultyCode,
                    degreeCode: item.degreeCode,
                    degreeName: item.degreeName,
                    degreeDescription: item.degreeDescription
                })
            });
            this.setState({degrees: allDegrees})
        }).catch(err => {
            console.log(err)
        })
    };

    deleteDegree(degreeCode) {
        fetch(nodeBasedUrl+"/admin/faculties/degrees"+ degreeCode, {
            method: 'DELETE',
            headers:{'Content-Type': 'application/json'}
        }).then(result => {
            if(result.ok){
                alert("degree deleted successfully");
                this.getDegrees();
            } else {
                alert("degree can't be deleted");
            }
        }).catch(err => {
            alert(JSON.parse(err.error));
        });
    }

    deleteFaculty(facultyCode) {
        fetch(nodeBasedUrl+"/admin/faculties/"+ facultyCode, {
            method: 'DELETE',
            headers:{'Content-Type': 'application/json'}
        }).then(result => {
            if(result.ok){
                alert("faculty deleted successfully");
                this.getFaculties();
            } else {
                alert("faculty can't be deleted");
            }
        }).catch(err => {
            alert(JSON.parse(err.error));
        });
    }

    addDegree = (obj) => {
        fetch(nodeBasedUrl+"/admin/faculties/degrees", {
            method: 'POST',
            body: JSON.stringify(obj),
            headers:{'Content-Type': 'application/json'}
        }).then(result => {
            if(result.ok){
                alert("degree added successfully");
            } else {
                alert("The degree can't be added");
            }
        }).catch(err => {
            alert(JSON.parse(err.error));
        });
    };

    addFaculty = (obj) => {
        fetch(nodeBasedUrl+"/admin/faculties", {
            method: 'POST',
            body: JSON.stringify(obj),
            headers:{'Content-Type': 'application/json'}
        }).then(result => {
            if(result.ok){
                alert("faculty added successfully");
            } else {
                alert("The faculty can't be added");
            }
        }).catch(err => {
            alert(JSON.parse(err.error));
        });
    };

    updateDegree = (degreeCode,obj) => {
        fetch(nodeBasedUrl+"/admin/faculties/degrees"+ degreeCode, {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers:{'Content-Type': 'application/json'}
        }).then(result => {
            if(result.ok){
                alert("degree updated successfully");
            } else {
                alert("The degree can't be updated");
            }
        }).catch(err => {
            alert(JSON.parse(err.error));
        });
    };

    updateFaculty = (facultyCode,obj) => {
        fetch(nodeBasedUrl+"/admin/faculties/"+ facultyCode, {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers:{'Content-Type': 'application/json'}
        }).then(result => {
            if(result.ok){
                alert("faculty updated successfully");
            } else {
                alert("The faculty can't be updated");
            }
        }).catch(err => {
            alert(JSON.parse(err.error));
        });
    };

    addUpdateDegree(degreeCode, source){
        let tempArray = this.state.degrees;

        if(source === "fromAddDegree"){
            if(this.state.degreeButtonName === "Add Degree"){
                if(this.state.degreeCode === "" || this.state.degreeName === "") {
                    //Error Message
                    alert("Error message");
                } else {
                    if(tempArray !== []){
                        let breakCondition = false;
                        tempArray.map((item) => {
                            if((item.degreeCode === this.state.degreeCode) && !breakCondition){
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
                            let degreeObj = {
                                facultyCode: this.state.facultyCode,
                                degreeCode: this.state.degreeCode,
                                degreeName: this.state.degreeName,
                                degreeDescription: this.state.degreeDescription
                            };

                            this.addDegree(degreeObj);
                            this.getDegrees();
                        }
                    } else {
                        let degreeObj = {
                            facultyCode: this.state.facultyCode,
                            degreeCode: this.state.degreeCode,
                            degreeName: this.state.degreeName,
                            degreeDescription: this.state.degreeDescription
                        };

                        this.addDegree(degreeObj);
                        this.getDegrees();
                    }
                }
            } else if(this.state.degreeButtonName === "Update Degree") {
                let degreeObj = {
                    degreeCode: this.state.degreeCode,
                    degreeName: this.state.degreeName,
                    degreeDescription: this.state.degreeDescription
                };

                this.updateDegree(degreeCode, degreeObj);
            }

            this.setState({degreeCode: ''});
            this.setState({degreeName: ''});
            this.setState({degreeDescription: ''});
        } else if(source === "fromEditDegree"){
            this.setState({degreeButtonName: "Update Degree"});

            this.getDegreeByID(degreeCode);
        }
    };

    getDegreeByID = (degreeCode) => {
        fetch(nodeBasedUrl+"/admin/faculties/degrees/"+ degreeCode).then(res => {
            if(res.ok){
                return res.json();
            } else {
                alert("Error when obtaining the degree information")
            }
        }).then(data => {
            this.setState({degreeCode: data.degreeCode});
            this.setState({degreeName: data.degreeName});
            this.setState({degreeDescription: data.degreeDescription});
        }).catch(err => {
            console.log(err)
        })
    };

    getFacultyByID = (facultyCode) => {
        fetch(nodeBasedUrl+"/admin/faculties/"+ facultyCode).then(res => {
            if(res.ok){
                return res.json();
            } else {
                alert("Error when obtaining the faculty information")
            }
        }).then(data => {
            this.setState({facultyID: data.facultyCode});
            this.setState({facultyName: data.facultyName});
            this.setState({degrees: data.degrees});
            this.setState({facultyDescription: data.facultyDescription});
        }).catch(err => {
            console.log(err)
        })
    };

    addUpdateFaculty(facultyCode, source){
        let tempArray = this.state.faculties;

        if(source === "fromAddFaculty"){
            if(this.state.facultyButtonName === "Add Faculty"){
                if(this.state.facultyCode === "" || this.state.facultyName === "") {
                    //Error Message
                    alert("Error message NIl");
                } else {
                    if(tempArray !== []){
                        let breakCondition = false;
                        tempArray.map((item) => {
                            if((item.facultyCode === this.state.facultyCode) && !breakCondition){
                                //Error Message if ids are same
                                alert("Error message SIMILAR FACULTY CODES");
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
                            let facultyObj = {
                                facultyCode: this.state.facultyCode,
                                facultyName: this.state.facultyName,
                                degrees: this.state.degrees,
                                facultyDescription: this.state.facultyDescription
                            };

                            this.addFaculty(facultyObj);
                            this.getFaculties();
                        }
                    } else {
                        let facultyObj = {
                            facultyCode: this.state.facultyCode,
                            facultyName: this.state.facultyName,
                            degrees: this.state.degrees,
                            facultyDescription: this.state.facultyDescription
                        };

                        this.addFaculty(facultyObj);
                        this.getFaculties();
                    }
                }
            } else if(this.state.facultyButtonName === "Update Faculty") {
                let facultyObj = {
                    facultyCode: this.state.facultyCode,
                    facultyName: this.state.facultyName,
                    degrees: this.state.degrees,
                    facultyDescription: this.state.facultyDescription
                };

                this.updateFaculty(facultyCode, facultyObj);

                this.setState({facultyButtonName: "Add Faculty"});
            }

            this.setState({facultyCode: ''});
            this.setState({facultyName: ''});
            this.setState({degrees: []});
            this.setState({facultyDescription: ''});
        } else if(source === "fromEditFaculty"){
            this.setState({facultyButtonName: "Update Faculty"});

            this.getFacultyByID(facultyCode);
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
                                    <MDBInput label="Faculty Code" group type="text" validate name="facultyCode" value={this.state.facultyCode}
                                              onChange={(e) => this.setState({facultyCode: e.target.value})}/>
                                </MDBCol>
                                <MDBCol>
                                    <MDBInput label="Faculty Name" group type="text" validate name="facultyName" value={this.state.facultyName}
                                                  onChange={(e) => this.setState({facultyName: e.target.value})}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <MDBInput type="textarea" label="Faculty Description" name="facultyDescription" value={this.state.facultyDescription} onChange={(e) => this.setState({facultyDescription: e.target.value})} outline />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <MDBInput label="Degree Code" group type="text" validate name="degreeCode"
                                                  value={this.state.degreeCode}
                                                  onChange={(e) => this.setState({degreeCode: e.target.value})}/>
                                </MDBCol>
                                <MDBCol>
                                    <MDBInput label="Degree Name" group type="text" validate name="degreeName"
                                                  value={this.state.degreeName}
                                                  onChange={(e) => this.setState({degreeName: e.target.value})}/>
                                </MDBCol>
                                <MDBCol>
                                    <MDBInput type="textarea" label="Degree Description" name="degreeDescription" value={this.state.degreeDescription} onChange={(e) => this.setState({degreeDescription: e.target.value})} outline />
                                </MDBCol>
                                <MDBCol><MDBBtn color="primary" rounded type="button" className="z-depth-1a"
                                                onClick={() => this.addUpdateDegree(this.state.degreeCode, "fromAddDegree")}>{this.state.degreeButtonName}</MDBBtn>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBTable>
                                    <MDBTableHead>
                                        <tr>
                                            <th>Degree Code</th>
                                            <th>Degree Name</th>
                                            <th>Degree Description</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {this.state.degrees.map((degree) => {
                                            return <tr key={degree.degreeCode}>
                                                <td>{degree.degreeCode}</td>
                                                <td>{degree.degreeName}</td>
                                                <td>{degree.degreeDescription}</td>
                                                <td><MDBBtn color="primary" rounded type="button" className="z-depth-1a"
                                                            onClick={() => this.addUpdateDegree(degree.degreeCode ,"fromEditDegree")}>Edit</MDBBtn>{' '}
                                                    <MDBBtn color="danger" rounded type="button" className="z-depth-1a"
                                                            onClick={() => this.deleteDegree(degree.degreeCode)}>Delete</MDBBtn>
                                                </td>
                                            </tr>
                                        })}
                                    </MDBTableBody>
                                </MDBTable>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol><MDBBtn color="primary" rounded type="button" className="z-depth-1a"
                                                onClick={() => this.addUpdateFaculty(this.state.facultyCode,"fromAddFaculty")}>{this.state.facultyButtonName}</MDBBtn></MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBTable>
                                    <MDBTableHead>
                                        <tr>
                                            <th>Faculty Code</th>
                                            <th>Faculty Name</th>
                                            <th>Degrees</th>
                                            <th>Faculty Description</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {this.state.faculties.map((faculty) => {
                                            return <tr key={faculty.facultyCode}>
                                                <td>{faculty.facultyCode}</td>
                                                <td>{faculty.facultyName}</td>
                                                <td>
                                                    <MDBTable>
                                                        <MDBTableHead>
                                                            <tr>
                                                                <th>Degree Code</th>
                                                                <th>Degree Name</th>
                                                                <th>Degree Description</th>
                                                            </tr>
                                                        </MDBTableHead>
                                                        <MDBTableBody>
                                                            {faculty.degrees.map((degree) => {
                                                                return <tr key={degree.degreeCode}>
                                                                    <td>{degree.degreeCode}</td>
                                                                    <td>{degree.degreeName}</td>
                                                                    <td>{degree.degreeDescription}</td>
                                                                </tr>
                                                            })}
                                                        </MDBTableBody>
                                                    </MDBTable>
                                                </td>
                                                <td>{faculty.facultyDescription}</td>
                                                <td><MDBBtn color="primary" rounded type="button" className="z-depth-1a"
                                                            onClick={() => this.addUpdateFaculty(faculty.facultyCode,"fromEditFaculty")}>Edit</MDBBtn>{' '}
                                                    <MDBBtn color="danger" rounded type="button" className="z-depth-1a"
                                                            onClick={() => this.deleteFaculty(faculty.facultyCode)}>Delete</MDBBtn>
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