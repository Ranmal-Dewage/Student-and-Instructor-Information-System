import React, {Component} from 'react'
import logo from "../images/SLIIT.png"
import MyCourses from './pages/sections/MyCourses'
import FacultyList from './pages/sections/FacultyList'
import {
    MDBListGroup,
    MDBListGroupItem,
    MDBIcon,
    MDBCollapse
} from 'mdbreact'
import {NavLink} from 'react-router-dom'
import './SideNavigation.css'

class SideNavigation extends Component {

    state = {
        collapseID: ""
    }

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    }

    handleAdminClicks(source) {
        if (source === "Faculty") {
            window.location = '/admin/facultyManagement'
        } else if (source === "Admin") {
            window.location = '/admin/adminManagement'
        } else if (source === "Instructor") {
            window.location = '/admin/instructorManagement'
        } else if (source === "Course") {
            window.location = '/admin/courseManagement'
        }

    }

    render() {
        var user = localStorage.getItem('sis-user')
        if (user) {
            user = JSON.parse(user)
        }
        return (
            <div className="sidebar-fixed position-fixed overflow-auto">
                <a href="/" className="waves-effect" style={{paddingTop: 30, paddingBottom: 30}}>
                    <img alt="SLIIT Logo" className="img-fluid" style={{width: "100%"}} src={logo}/>
                </a>
                <MDBListGroup className="list-group-flush">
                    <NavLink to="#">
                        <MDBListGroupItem onClick={this.toggleCollapse("asCollapse")}>
                            <MDBIcon icon="laptop" className="mr-3"/>
                            Academic Services
                            <div className="float-right"><i className="fa fa-angle-down" style={{paddingLeft: 5}}/>
                            </div>
                            <MDBCollapse id="asCollapse" isOpen={this.state.collapseID}>
                                <MDBListGroup className="list-group-flush" style={{width: "100"}}>
                                    <MDBListGroupItem
                                        onClick={() => window.open("https://azureforeducation.microsoft.com/devtools", "_blank")}>Microsoft
                                        Imagine</MDBListGroupItem>
                                    <MDBListGroupItem
                                        onClick={() => window.open("https://imagineacademy.microsoft.com/?whr=default", "_blank")}>Microsoft
                                        Imagine Academy</MDBListGroupItem>
                                    <MDBListGroupItem
                                        onClick={() => window.open("https://www.netacad.com/login/", "_blank")}>Cisco
                                        Network Academy</MDBListGroupItem>
                                    <MDBListGroupItem
                                        onClick={() => window.open("https://turnitin.com/login_page.asp?lang=en_us", "_blank")}>Turnitin</MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCollapse>
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="#">
                        <MDBListGroupItem onClick={this.toggleCollapse("libraryCollapse")}>
                            <MDBIcon icon="book" className="mr-3"/>
                            Libraries
                            <div className="float-right"><i className="fa fa-angle-down" style={{paddingLeft: 5}}/>
                            </div>
                            <MDBCollapse id="libraryCollapse" isOpen={this.state.collapseID}>
                                <MDBListGroup className="list-group-flush" style={{width: "100"}}>
                                    <MDBListGroupItem onClick={() => window.open("http://library.sliit.lk/", "_blank")}>SLIIT
                                        Online Library</MDBListGroupItem>
                                    <MDBListGroupItem onClick={() => window.open("http://dspace.sliit.lk/", "_blank")}>Research
                                        & Publication</MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCollapse>
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="#">
                        <MDBListGroupItem onClick={this.toggleCollapse("emailCollapse")}>
                            <MDBIcon icon="user-tie" className="mr-3"/>
                            Student Email
                            <div className="float-right"><i className="fa fa-angle-down" style={{paddingLeft: 5}}/>
                            </div>
                            <MDBCollapse id="emailCollapse" isOpen={this.state.collapseID}>
                                <MDBListGroup className="list-group-flush" style={{width: "100"}}>
                                    <MDBListGroupItem onClick={() => window.open("https://mail.google.com", "_blank")}>G
                                        Suit (Gmail)</MDBListGroupItem>
                                    <MDBListGroupItem
                                        onClick={() => window.open("https://login.microsoftonline.com", "_blank")}>O365
                                        (Microsoft)</MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCollapse>
                        </MDBListGroupItem>
                    </NavLink>
                    {user && 1 <= user.permissionLevel <= 3 &&
                    <>
                        < NavLink to="#">
                            <MDBListGroupItem onClick={this.toggleCollapse("facultiesCollapse")}>
                                <MDBIcon icon="university" className="mr-3"/>
                                Faculties
                                <div className="float-right"><i className="fa fa-angle-down"
                                                                style={{paddingLeft: 5}}/>
                                </div>
                                <MDBCollapse id="facultiesCollapse" isOpen={this.state.collapseID}>
                                    <FacultyList/>
                                </MDBCollapse>
                            </MDBListGroupItem>
                        </NavLink>
                        <NavLink to="#">
                            <MDBListGroupItem onClick={this.toggleCollapse("courseCollapse")}>
                                <MDBIcon icon="book-open" className="mr-3"/>
                                My Courses
                                <div className="float-right"><i className="fa fa-angle-down"
                                                                style={{paddingLeft: 5}}/>
                                </div>
                                <MDBCollapse id="courseCollapse" isOpen={this.state.collapseID}>
                                    <MyCourses/>
                                </MDBCollapse>
                            </MDBListGroupItem>
                        </NavLink>
                        <NavLink to="/profile">
                            <MDBListGroupItem>
                                <MDBIcon icon="user" className="mr-4"/>
                                Profile
                                <MDBCollapse/>
                            </MDBListGroupItem>
                        </NavLink>
                    </>
                    }
                    {user && user.permissionLevel === 3 &&
                    <>
                        <NavLink to="#">
                            <MDBListGroupItem onClick={this.toggleCollapse("fmCollapse")}>
                                <MDBIcon icon="pen-fancy" className="mr-3"/>
                                Faculty Management
                                <MDBCollapse id="fmCollapse" isOpen={this.state.collapseID}>
                                    <MDBListGroup className="list-group-flush" style={{width: "100"}}>
                                        <MDBListGroupItem onClick={() => this.handleAdminClicks("Faculty")}>Faculty
                                            Management</MDBListGroupItem>
                                    </MDBListGroup>
                                </MDBCollapse>
                            </MDBListGroupItem>
                        </NavLink>
                        <NavLink to="#">
                            <MDBListGroupItem onClick={this.toggleCollapse("cmCollapse")}>
                                <MDBIcon icon="edit" className="mr-3"/>
                                Course Management
                                <MDBCollapse id="cmCollapse" isOpen={this.state.collapseID}>
                                    <MDBListGroup className="list-group-flush" style={{width: "100"}}>
                                        <MDBListGroupItem onClick={() => this.handleAdminClicks("Course")}>Course
                                            Management</MDBListGroupItem>
                                    </MDBListGroup>
                                </MDBCollapse>
                            </MDBListGroupItem>
                        </NavLink>
                        <NavLink to="#">
                            <MDBListGroupItem onClick={this.toggleCollapse("umCollapse")}>
                                <MDBIcon icon="user-edit" className="mr-3"/>
                                User Management
                                <MDBCollapse id="umCollapse" isOpen={this.state.collapseID}>
                                    <MDBListGroup className="list-group-flush" style={{width: "100"}}>
                                        <MDBListGroupItem onClick={() => this.handleAdminClicks("Admin")}>Admin
                                            Management</MDBListGroupItem>
                                        <MDBListGroupItem onClick={() => this.handleAdminClicks("Instructor")}>Instructor
                                            Management</MDBListGroupItem>
                                    </MDBListGroup>
                                </MDBCollapse>
                            </MDBListGroupItem>
                        </NavLink>
                    </>
                    }
                </MDBListGroup>
            </div>
        );
    }
}

export default SideNavigation;