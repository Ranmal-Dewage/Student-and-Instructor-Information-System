import React from 'react'
import {MDBIcon, MDBCard, MDBCardBody, MDBCol, MDBCardHeader, MDBRow} from "mdbreact";

export default class Profile extends React.Component {

    getFaculty = id => {
        return "Computing"
    }

    getDegree = id => {
        return "Software Engineering"
    }

    getCourses = ids => {
        return ["Application Frameworks", "Distributed Systems", "Software Architecture", "SEPQM", "ESD"].join(", ")
    }

    render() {
        var user = localStorage.getItem('sis-user')
        if (user) {
            user = JSON.parse(user)
        }
        return (
            <MDBRow>
                <MDBCol md="12" lg="12" className="mb-4">
                    <MDBCard news>
                        <MDBCardHeader>
                            <div className="content">
                                <img
                                    src={require("../../images/avatar.png")}
                                    alt=""
                                    className="rounded-circle avatar-img z-depth-1-half mr-3"
                                    style={{width: 30}}
                                />
                                {user.firstName + " " + user.lastName}
                            </div>
                        </MDBCardHeader>
                        <MDBCardBody>
                            <div className="social-meta">
                                <p>
                                    <MDBIcon icon="envelope" className="mr-3"/>
                                    Email : {user.email}
                                </p>
                                <p>
                                    <MDBIcon icon="phone" className="mr-3"/>
                                    Phone : {user.mobile}
                                </p>
                                <p>
                                    <MDBIcon icon="id-badge" className="mr-3 ml-1"/>
                                    NIC : {user.nic}
                                </p>
                                <p>
                                    <MDBIcon icon="home" className="mr-3"/>
                                    Address : {user.address}
                                </p>
                            </div>
                            <hr/>
                            <p>
                                <MDBIcon icon="building" className="mr-3"/>
                                Faculty : {this.getFaculty(user.faculty[0])}
                            </p>
                            <p>
                                <MDBIcon icon="user-graduate" className="mr-3"/>
                                Degree : {this.getDegree(user.degree[0])}
                            </p>
                            <p>
                                <MDBIcon icon="book" className="mr-3"/>
                                My Courses : {this.getCourses(user.course)}
                            </p>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        )
    }
}