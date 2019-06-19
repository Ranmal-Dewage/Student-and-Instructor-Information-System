import React from 'react'
import qs from 'query-string'
import {MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBRow} from "mdbreact";
import EventCalender from "./sections/HomeBody";

export default class SearchCourse extends React.Component {

    state={
        name:''
    }

    componentDidMount() {
        const name = qs.parse(this.props.location.search).name
        if (name) {
            this.setState({name})
        }
    }

    render() {
        return (
            <MDBRow className="mb-4">
                <MDBCol md="12" className="mb-4">
                    <MDBCard className="mb-4">
                        <MDBCardHeader>Search results for course : {this.state.name}</MDBCardHeader>
                        <MDBCardBody>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        )
    }
}