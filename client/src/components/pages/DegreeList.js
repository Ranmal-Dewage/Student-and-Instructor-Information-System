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
import {getDegrees} from '../functions/Services'

export default class DegreeList extends React.Component {

    state = {
        degrees: []
    }

    componentDidMount() {

        if (this.props.match && this.props.match.params) {
            const did = this.props.match.params.id
            getDegrees(did)
                .then(res => {
                    const degrees = []
                    res.degrees.map((degree, i) => {
                        const to = "/degree/" + degree.dcode + "/courses"
                        return degrees.push(
                            <NavLink to={to} key={i}>
                                <MDBListGroupItem>
                                    <MDBIcon icon="graduation-cap" className="mr-3"/>
                                    {degree.dname}
                                </MDBListGroupItem>
                            </NavLink>
                        )
                    })
                    this.setState({degrees: degrees})
                })
                .catch(err => {
                    console.log(err)
                })
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
                                {this.state.degrees}
                            </MDBListGroup>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        )
    }
}