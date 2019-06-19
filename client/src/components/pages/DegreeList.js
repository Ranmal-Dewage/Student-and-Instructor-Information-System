import React from 'react'
import {NavLink} from "react-router-dom";
import {
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCol,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem, MDBRow
} from "mdbreact"

export default class DegreeList extends React.Component {

    state = {
        fid: ''
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params) {
            this.setState({fid: this.props.match.params.id})
        } else {
            this.props.history.push('/faculties/404')
        }
    }

    render() {
        return (
            <MDBRow className="mb-4">
                <MDBCol md="12" className="mb-4">
                    <MDBCard className="mb-4">
                        <MDBCardHeader>Degrees</MDBCardHeader>
                        <MDBCardBody>
                            <MDBListGroup className="list-group-flush">
                                <NavLink to="/degree/SE/courses">
                                    <MDBListGroupItem>
                                        <MDBIcon icon="graduation-cap" className="mr-3"/>
                                        Software Engineering
                                    </MDBListGroupItem>
                                </NavLink>
                                <NavLink to="/degree/IT/courses">
                                    <MDBListGroupItem>
                                        <MDBIcon icon="graduation-cap" className="mr-3"/>
                                        Information Technology
                                    </MDBListGroupItem>
                                </NavLink>
                            </MDBListGroup>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        )
    }
}