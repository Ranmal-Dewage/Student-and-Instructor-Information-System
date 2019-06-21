import React from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBFormInline,
} from 'mdbreact';

export default class BreadcrumSection extends React.Component {
    render() {
        return (
            <MDBCard className="mb-5">
                <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
                    <MDBBreadcrumb>
                        <MDBBreadcrumbItem>Degree</MDBBreadcrumbItem>
                        <MDBBreadcrumbItem active>Courses</MDBBreadcrumbItem>
                    </MDBBreadcrumb>
                    <MDBFormInline className="md-form m-0">
                        Year :
                        <select className="browser-default custom-select"
                                style={{marginLeft: 5, marginRight: 5}}
                                name="year" value={this.props.value}
                                onChange={this.props.handleChange}>
                            <option value="1st">1st</option>
                            <option value="2nd">2nd</option>
                            <option value="3rd">3rd</option>
                            <option value="4th">4th</option>
                        </select>
                        Semester :
                        <select className="browser-default custom-select"
                                style={{marginLeft: 5, marginRight: 5}}
                                name="semester" value={this.props.semester}
                                onChange={this.props.handleChange}>
                            <option value="1st">1st</option>
                            <option value="2nd">2nd</option>
                        </select>
                    </MDBFormInline>
                </MDBCardBody>
            </MDBCard>
        )
    }
}

