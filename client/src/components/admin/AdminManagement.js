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

const springBaseUrl = config.springBaseUrl;

export default class AdminManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            adminFirstName: '',
            adminLastName: '',
            adminNic: '',
            adminPhone: '',
            adminEmail: '',
            adminPassword: '',
            adminAddress: '',
            admins: [],
            adminButtonName: ''
        };
    }

    componentDidMount() {
        this.setState({adminButtonName: "Add Admin"});
        this.getAdmins();
    }

    getToken = () => {
        var user = localStorage.getItem('sis-user')
        if (user) {
            user = JSON.parse(user)
            return user.token
        }
        return null
    }

    getAdmins = () => {
        let allAdmins = [];
        fetch(springBaseUrl + "/users/roles/admin", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.getToken()
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                alert("Error when obtaining admins");
            }
        }).then(data => {
            data.map((item) => {
                return allAdmins.push({
                    adminID: item.id,
                    adminFirstName: item.firstName,
                    adminLastName: item.lastName,
                    adminNic: item.nic,
                    adminPhone: item.mobile,
                    adminEmail: item.email,
                    adminPassword: item.password,
                    adminAddress: item.address,
                    roles: item.roles
                })
            });
            this.setState({admins: allAdmins})
        }).catch(err => {
            console.log(err)
        })
    };

    deleteAdmin(id) {
        fetch(springBaseUrl + "/users/" + id, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.getToken()
            })
        }).then(result => {
            if (result.ok) {
                alert("Admin deleted successfully");
                this.getAdmins();
            } else {
                alert("Admin can't be deleted");
            }
        }).catch(err => {
            alert(JSON.parse(err.error));
        });

    }

    addUpdateAdmin(email, source) {
        let tempArray = this.state.admins;
        if (source === "fromAddAdmin") {
            if (this.state.adminButtonName === "Add Admin") {
                if (this.state.adminFirstName === "" || this.state.adminLastName === "" || this.state.adminNic === "" || this.state.adminPhone === "" ||
                    this.state.adminEmail === "" || this.state.adminPassword === "" || this.state.adminAddress === "") {
                    //Error Message
                    alert("Error message");
                } else {
                    if (tempArray !== []) {
                        let breakCondition = false;
                        tempArray.map((item) => {
                            if ((item.adminEmail === this.state.adminEmail) && !breakCondition) {
                                //Error Message if ids are same
                                alert("Error message");
                                breakCondition = true;
                                return null;
                            }
                            return null;
                        });


                        if (!breakCondition) {
                            let adminObj = {
                                "address": this.state.adminAddress,
                                "firstName": this.state.adminFirstName,
                                "lastName": this.state.adminLastName,
                                "mobile": this.state.adminPhone,
                                "email": this.state.adminEmail,
                                "password": getHash(this.state.adminPassword),
                                "roles": [{"role": "ADMIN"}],
                                "nic": this.state.adminNic
                            };

                            this.addAdmin(adminObj);
                            this.getAdmins();
                        }
                    } else {
                        let adminObj = {
                            "address": this.state.adminAddress,
                            "firstName": this.state.adminFirstName,
                            "lastName": this.state.adminLastName,
                            "mobile": this.state.adminPhone,
                            "email": this.state.adminEmail,
                            "password": getHash(this.state.adminPassword),
                            "roles": [{"role": "ADMIN"}],
                            "nic": this.state.adminNic
                        };

                        this.addAdmin(adminObj);
                        this.getAdmins();
                    }
                }
            } else if (this.state.adminButtonName === "Update Admin") {
                let adminObj = {
                    "address": this.state.adminAddress,
                    "firstName": this.state.adminFirstName,
                    "lastName": this.state.adminLastName,
                    "mobile": this.state.adminPhone,
                    "email": this.state.adminEmail,
                    //"password": getHash(this.state.adminPassword),
                    "roles": [{"role": "ADMIN"}],
                    "nic": this.state.adminNic
                };

                this.updateAdmin(email, adminObj);
                this.setState({adminButtonName: "Add Admin"});
            }

            this.setState({adminFirstName: ''});
            this.setState({adminLastName: ''});
            this.setState({adminNic: ''});
            this.setState({adminPhone: ''});
            this.setState({adminEmail: ''});
            this.setState({adminPassword: ''});
            this.setState({adminAddress: ''});
        } else if (source === "fromEditAdmin") {
            this.setState({adminButtonName: "Update Admin"});

            this.getAdminByEmail(email)
        }
    };

    getAdminByEmail = (email) => {
        fetch(springBaseUrl + "/admin/admins/" + email).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                alert("Error when obtaining the admin information")
            }
        }).then(data => {
            this.setState({adminFirstName: data.firstName});
            this.setState({adminLastName: data.lastName});
            this.setState({adminNic: data.nic});
            this.setState({adminPhone: data.mobile});
            this.setState({adminEmail: data.email});
            //this.setState({adminPassword: data.password});
            this.setState({adminAddress: data.address});
        }).catch(err => {
            console.log(err)
        })
    };

    addAdmin = (obj) => {
        fetch(springBaseUrl + "/users", {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.getToken()
            })
        }).then(result => {
            if (result.ok) {
                alert("Admin added successfully");
            } else {
                alert("The admin can't be added");
            }
        }).catch(err => {
            alert(JSON.parse(err.error));
        });
    };

    updateAdmin = (email, obj) => {
        fetch(springBaseUrl + "/admin/admins/" + email, {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.getToken()
            })
        }).then(result => {
            if (result.ok) {
                alert("Instructor updated successfully");
            } else {
                alert("The Instructor can't be updated");
            }
        }).catch(err => {
            alert(JSON.parse(err.error));
        });
    };


    render() {
        return (
            <div>
                <MDBCard>
                    <MDBCardHeader>Admin Management</MDBCardHeader>
                    <MDBCardBody>
                        <form>
                            <MDBRow>
                                <MDBCol><MDBInput label="First Name" group type="text" validate name="adminFirstName"
                                                  value={this.state.adminFirstName}
                                                  onChange={(e) => this.setState({adminFirstName: e.target.value})}/>
                                </MDBCol>
                                <MDBCol><MDBInput label="Last Name" group type="text" validate name="adminLastName"
                                                  value={this.state.adminLastName}
                                                  onChange={(e) => this.setState({adminLastName: e.target.value})}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol><MDBInput label="Nic" group type="text" validate name="adminNic"
                                                  value={this.state.adminNic}
                                                  onChange={(e) => this.setState({adminNic: e.target.value})}/>
                                </MDBCol>
                                <MDBCol>
                                    <MDBInput label="Phone" group type="text" validate name="adminPhone"
                                              value={this.state.adminPhone}
                                              onChange={(e) => this.setState({adminPhone: e.target.value})}/>
                                </MDBCol>

                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <MDBInput label="Email" group type="email" validate name="adminEmail"
                                              value={this.state.adminEmail}
                                              onChange={(e) => this.setState({adminEmail: e.target.value})}/>
                                </MDBCol>
                                <MDBCol><MDBInput label="Password" group type="password" validate name="adminPassword"
                                                  value={this.state.adminPassword}
                                                  onChange={(e) => this.setState({adminPassword: e.target.value})}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <MDBInput type="textarea" label="Address" name="adminAddress"
                                              value={this.state.adminAddress}
                                              onChange={(e) => this.setState({adminAddress: e.target.value})} outline/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol><MDBBtn color="primary" rounded type="button" className="z-depth-1a"
                                                onClick={() => this.addUpdateAdmin(this.state.adminEmail, "fromAddAdmin")}>{this.state.adminButtonName}</MDBBtn></MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <MDBTable>
                                        <MDBTableHead>
                                            <tr>
                                                <th>Admin First Name</th>
                                                <th>Admin Last Name</th>
                                                <th>Admin Nic</th>
                                                <th>Admin Phone</th>
                                                <th>Admin Email</th>
                                                <th>Admin Address</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            {this.state.admins.map((admin) => {
                                                return <tr key={admin.instructorEmail}>
                                                    <td>{admin.adminFirstName}</td>
                                                    <td>{admin.adminLastName}</td>
                                                    <td>{admin.adminNic}</td>
                                                    <td>{admin.adminPhone}</td>
                                                    <td>{admin.adminEmail}</td>
                                                    <td>{admin.adminAddress}</td>
                                                    <td>
                                                        <MDBBtn color="danger" rounded type="button"
                                                                className="z-depth-1a"
                                                                onClick={() => this.deleteAdmin(admin.adminID)}>Delete</MDBBtn>
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
                                                                onClick={() => this.addUpdateAdmin(admin.adminEmail, "fromEditAdmin")}>Edit</MDBBtn>{' '}*/