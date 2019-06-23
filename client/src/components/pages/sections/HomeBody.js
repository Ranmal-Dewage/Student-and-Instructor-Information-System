import React, {Component} from 'react';
import {
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBRow, MDBIcon
} from 'mdbreact';
import EventCalender from './EventCalender';
import Announcements from "./Announcements";

class HomeBody extends Component {
    render() {
        return (
            <MDBRow>
                <MDBCol md="12">
                    <MDBCard className="mb-4">
                        <MDBCardHeader><MDBIcon icon="volume-up" className="mr-3"/>Latest announcements</MDBCardHeader>
                        <MDBCardBody>
                            <Announcements/>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="12">
                    <MDBCard style={{height: 500}}>
                        <MDBCardHeader><MDBIcon icon="calendar-alt" className="mr-3"/>Event Calender</MDBCardHeader>
                        <MDBCardBody>
                            <EventCalender/>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        )
    }
}

export default HomeBody;

