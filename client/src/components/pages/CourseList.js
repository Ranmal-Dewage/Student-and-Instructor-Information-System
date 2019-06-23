import React from 'react'
import Filter from './sections/CourseBreadcrumSection'
import {
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCol,
    MDBCollapse,
    MDBListGroup,
    MDBListGroupItem,
    MDBRow
} from "mdbreact";
import CourseElement from './sections/CourseElement'
import {courseByDegree} from '../functions/Services'

export default class CourseList extends React.Component {

    state = {
        degree: '',
        collapseID: 'ss',
        year: '1st',
        semester: '1st',
        courses: []
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params) {
            const degree = this.props.match.params.id
            this.setState({degree: degree}, () => this.loadCourses())
        } else {
            this.props.history.push('/faculties/404')
        }
    }

    loadCourses = () => {
        courseByDegree("dcode=" + this.state.degree + "&year=" + this.state.year + "&sem=" + this.state.semester)
            .then(res => {
                this.setState({courses: res.courses})
            })
            .catch(err => {
                console.log(err)
            })
    }

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    }

    handleChange = event => {
        let value = event;
        if (event.target) {
            value = event.target.value;
        }
        this.setState({[event.target.name]: value}, () => this.loadCourses())
    }

    render() {
        return (
            <>
                <Filter
                    handleChange={this.handleChange}
                    year={this.state.year}
                    semester={this.state.semester}
                />
                <MDBRow className="mb-4">
                    <MDBCol md="12" className="mb-4">
                        <MDBCard className="mb-4">
                            <MDBCardHeader>{this.state.year} Year, {this.state.semester} semester courses</MDBCardHeader>
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
            </>
        )
    }
}