import React from 'react'
import qs from 'query-string'
import {
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCol,
    MDBCollapse,
    MDBListGroup,
    MDBListGroupItem,
    MDBRow
} from "mdbreact"
import {searchCourse} from '../functions/Services'
import CourseElement from "./sections/CourseElement";

export default class SearchCourse extends React.Component {

    state = {
        name: '',
        collapseID: '',
        courses: []
    }

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    }

    componentDidMount() {
        const name = qs.parse(this.props.location.search).name
        if (name) {
            this.setState({name}, () => this.loadCourses())
        }
    }

    loadCourses = () => {
        searchCourse(this.state.name)
            .then(res => {
                this.setState({courses: res.courses})
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <MDBRow className="mb-4">
                <MDBCol md="12" className="mb-4">
                    <MDBCard className="mb-4">
                        <MDBCardHeader>Search results for course : {this.state.name}</MDBCardHeader>
                        <MDBCardBody>
                            <MDBListGroup className="list-group-flush">
                                {this.state.courses.map((course, i) => {
                                    return (
                                        <a href="#!" key={i}>
                                            <MDBListGroupItem>
                                                <div
                                                    onClick={this.toggleCollapse(course.ccode)}>{course.cname}
                                                    <div className="float-right"><i className="fa fa-angle-down"
                                                                                    style={{paddingLeft: 5}}/>
                                                    </div>
                                                </div>
                                                <MDBCollapse id={course.ccode} isOpen={this.state.collapseID}>
                                                    <CourseElement course={course}/>
                                                </MDBCollapse>
                                            </MDBListGroupItem>
                                        </a>
                                    )
                                })}
                            </MDBListGroup>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        )
    }
}