import React from 'react'
import {MDBIcon, MDBCard, MDBCardBody, MDBCol, MDBCardHeader, MDBRow} from "mdbreact"
import {getDegree, getCourse, getFaculty} from '../functions/Services'

export default class Profile extends React.Component {

    state = {
        faculty: '',
        courses: [],
        degree: '',
        user: {}
    }

    componentDidMount() {
        var user = localStorage.getItem('sis-user')
        if (user) {
            user = JSON.parse(user)
            this.setState({user})
            this.getFacultyName(user.faculty[0])
            this.getDegreeName(user.degree[0])
            if (user.courses) {
                this.getCourseName(user.courses)
            }
        }
    }

    getFacultyName = id => {
        getFaculty(id)
            .then(res => {
                this.setState({faculty: res.faculties[0].fname})
            })
            .catch(err => {
                console.log(err)
            })
    }

    getDegreeName = id => {
        getDegree(id)
            .then(res => {
                this.setState({degree: res.degrees[0].dname})
            })
            .catch(err => {
                console.log(err)
            })
    }

    getCourseName = ids => {
        ids.map(id => {
            return getCourse(id)
                .then(res => {
                    this.setState({courses: [...this.state.courses, res.courses[0].cname]})
                })
                .catch(err => {
                    console.log(err)
                })
        })

    }

    render() {

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
                                {this.state.user.firstName + " " + this.state.user.lastName}
                            </div>
                        </MDBCardHeader>
                        <MDBCardBody>
                            <div className="social-meta">
                                <p>
                                    <MDBIcon icon="envelope" className="mr-3"/>
                                    Email : {this.state.user.email}
                                </p>
                                <p>
                                    <MDBIcon icon="phone" className="mr-3"/>
                                    Phone : {this.state.user.mobile}
                                </p>
                                <p>
                                    <MDBIcon icon="id-badge" className="mr-3 ml-1"/>
                                    NIC : {this.state.user.nic}
                                </p>
                                <p>
                                    <MDBIcon icon="home" className="mr-3"/>
                                    Address : {this.state.user.address}
                                </p>
                            </div>
                            <hr/>
                            <p>
                                <MDBIcon icon="building" className="mr-3"/>
                                Faculty : {this.state.faculty}
                            </p>
                            <p>
                                <MDBIcon icon="user-graduate" className="mr-3"/>
                                Degree : {this.state.degree}
                            </p>
                            <p>
                                <MDBIcon icon="book" className="mr-3"/>
                                My Courses : {this.state.courses.join(", ")}
                            </p>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        )
    }
}