import React, {Component} from 'react';
import logo from "../images/SLIIT.png";
import {
    MDBListGroup,
    MDBListGroupItem,
    MDBIcon,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem
} from 'mdbreact';
import {NavLink} from 'react-router-dom';
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

    render() {
        return (
            <div className="sidebar-fixed position-fixed overflow-auto">
                <a href="#!" className="waves-effect" style={{paddingTop: 30, paddingBottom: 30}}>

                    <img alt="MDB React Logo" className="img-fluid" style={{width: "100%"}} src={logo}/>

                </a>
                <MDBListGroup className="list-group-flush">
                    <NavLink>
                        <MDBListGroupItem onClick={this.toggleCollapse("facultiesCollapse")}>
                            <MDBIcon icon="university" className="mr-3"/>
                            Faculties
                            <MDBCollapse id="facultiesCollapse" isOpen={this.state.collapseID}>
                                <MDBListGroup className="list-group-flush" style={{width: "100"}}>
                                    <MDBListGroupItem>Faculty of Computing</MDBListGroupItem>
                                    <MDBListGroupItem>Faculty of Business</MDBListGroupItem>
                                    <MDBListGroupItem>Faculty of Engineering</MDBListGroupItem>
                                    <MDBListGroupItem>Faculty of Humanities & Sciences</MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCollapse>
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink>
                        <MDBListGroupItem onClick={this.toggleCollapse("asCollapse")}>
                            <MDBIcon icon="laptop" className="mr-3"/>
                            Academic Services
                            <MDBCollapse id="asCollapse" isOpen={this.state.collapseID}>
                                <MDBListGroup className="list-group-flush" style={{width: "100"}}>
                                    <MDBListGroupItem onClick={()=> window.open("https://azureforeducation.microsoft.com/devtools", "_blank")}>Microsoft Imagine</MDBListGroupItem>
                                    <MDBListGroupItem onClick={()=> window.open("https://imagineacademy.microsoft.com/?whr=default", "_blank")}>Microsoft Imagine Academy</MDBListGroupItem>
                                    <MDBListGroupItem onClick={()=> window.open("https://www.netacad.com/login/", "_blank")}>Cisco Network Academy</MDBListGroupItem>
                                    <MDBListGroupItem onClick={()=> window.open("https://turnitin.com/login_page.asp?lang=en_us", "_blank")}>Turnitin</MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCollapse>
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink>
                        <MDBListGroupItem onClick={this.toggleCollapse("libraryCollapse")}>
                            <MDBIcon icon="book" className="mr-3"/>
                            Libraries
                            <MDBCollapse id="libraryCollapse" isOpen={this.state.collapseID}>
                                <MDBListGroup className="list-group-flush" style={{width: "100"}}>
                                    <MDBListGroupItem onClick={()=> window.open("http://library.sliit.lk/", "_blank")}>SLIIT Online Library</MDBListGroupItem>
                                    <MDBListGroupItem onClick={()=> window.open("http://dspace.sliit.lk/", "_blank")}>Research & Publication</MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCollapse>
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink>
                        <MDBListGroupItem onClick={this.toggleCollapse("emailCollapse")}>
                            <MDBIcon icon="user-tie" className="mr-3"/>
                            Student Email
                            <MDBCollapse id="emailCollapse" isOpen={this.state.collapseID}>
                                <MDBListGroup className="list-group-flush" style={{width: "100"}}>
                                    <MDBListGroupItem onClick={()=> window.open("https://mail.google.com", "_blank")}>G Suit (Gmail)</MDBListGroupItem>
                                    <MDBListGroupItem onClick={()=> window.open("https://login.microsoftonline.com", "_blank")}>O365 (Microsoft)</MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCollapse>
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink>
                        <MDBListGroupItem onClick={this.toggleCollapse("courseCollapse")}>
                            <MDBIcon icon="book-open" className="mr-3"/>
                            My Courses
                            <MDBCollapse id="courseCollapse" isOpen={this.state.collapseID}>
                                <MDBListGroup className="list-group-flush" style={{width: "100"}}>
                                    <MDBListGroupItem>Faculty of Computing</MDBListGroupItem>
                                    <MDBListGroupItem>Faculty of Business</MDBListGroupItem>
                                    <MDBListGroupItem>Faculty of Engineering</MDBListGroupItem>
                                    <MDBListGroupItem>Faculty of Humanities & Sciences</MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCollapse>
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink>
                        <MDBListGroupItem onClick={this.toggleCollapse("fmCollapse")}>
                            <MDBIcon icon="pen-fancy" className="mr-3"/>
                            Faculty Management
                            <MDBCollapse id="fmCollapse" isOpen={this.state.collapseID}>
                                <MDBListGroup className="list-group-flush" style={{width: "100"}}>
                                    <MDBListGroupItem>Add Faculty</MDBListGroupItem>
                                    <MDBListGroupItem>Edit Faculty</MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCollapse>
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink>
                        <MDBListGroupItem onClick={this.toggleCollapse("cmCollapse")}>
                            <MDBIcon icon="edit" className="mr-3"/>
                            Course Management
                            <MDBCollapse id="cmCollapse" isOpen={this.state.collapseID}>
                                <MDBListGroup className="list-group-flush" style={{width: "100"}}>
                                    <MDBListGroupItem>Add Course</MDBListGroupItem>
                                    <MDBListGroupItem>Edit Course</MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCollapse>
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink>
                        <MDBListGroupItem onClick={this.toggleCollapse("umCollapse")}>
                            <MDBIcon icon="user-edit" className="mr-3"/>
                            User Management
                            <MDBCollapse id="umCollapse" isOpen={this.state.collapseID}>
                                <MDBListGroup className="list-group-flush" style={{width: "100"}}>
                                    <MDBListGroupItem>Add User</MDBListGroupItem>
                                    <MDBListGroupItem>Edit User</MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCollapse>
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="profile">
                        <MDBListGroupItem onClick={this.toggleCollapse("umCollapse")}>
                            <MDBIcon icon="user" className="mr-4"/>
                            Profile
                            <MDBCollapse id="umCollapse" isOpen={this.state.collapseID}>
                                <MDBListGroup className="list-group-flush" style={{width: "100"}}>
                                    <MDBListGroupItem>Add User</MDBListGroupItem>
                                    <MDBListGroupItem>Edit User</MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCollapse>
                        </MDBListGroupItem>
                    </NavLink>
                </MDBListGroup>
            </div>
        );
    }
}

export default SideNavigation;