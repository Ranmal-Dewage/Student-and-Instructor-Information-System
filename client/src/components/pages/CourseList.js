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
import CourseElement from "./sections/CourseElement";

export default class CourseList extends React.Component {

    state = {
        degree: '',
        collapseID: '',
        year: '1',
        semester: '1'
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params) {
            this.setState({degree: this.props.match.params.id})
        } else {
            this.props.history.push('/faculties/404')
        }
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
            console.log(this.state)
        }
        this.setState({[event.target.name]: value})
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
                            <MDBCardHeader>Year {this.state.year}, semester {this.state.semester} courses</MDBCardHeader>
                            <MDBCardBody>
                                <MDBListGroup className="list-group-flush">
                                    <a href="#!">
                                        <MDBListGroupItem>
                                            <div onClick={this.toggleCollapse("se3045")}>Software architecture
                                                <div className="float-right"><i className="fa fa-angle-down"
                                                                                style={{paddingLeft: 5}}/>
                                                </div>
                                            </div>
                                            <MDBCollapse id="se3045" isOpen={this.state.collapseID}>
                                                <CourseElement/>
                                            </MDBCollapse>
                                        </MDBListGroupItem>
                                    </a>
                                </MDBListGroup>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </>
        )
    }
}