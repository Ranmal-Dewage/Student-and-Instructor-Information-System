import {Component} from "react";
import React from "react";
import {MDBCard, MDBCardBody, MDBCardHeader, MDBCardImage} from "mdbreact";

export default class Announcements extends Component {
    render() {
        return <>
            <MDBCard className="mb-4">
                <MDBCardHeader>Extended Campus Access Hours</MDBCardHeader>
                <MDBCardBody>
                    <ul>
                        <li style={{padding: 10}}>Campus access hours have been extended from <span
                            style={{color: "#FF0000"}}><u> 7.30 p.m. to 10.00 p.m</u></span>. until the end of
                            examination time
                            period.
                        </li>
                        <li style={{padding: 10}}>Students are <u>strictly</u> advised to remain at the study areas and
                            common areas during the above said time and
                            to avoid accessing other areas of the campus premises.
                        </li>
                        <li style={{padding: 10}}>The above measure is taken in view of security of the students and
                            staff members.
                        </li>
                    </ul>
                </MDBCardBody>
            </MDBCard>
            <MDBCard className="mb-4">
                <MDBCardHeader>SLIIT WALK</MDBCardHeader>
                <MDBCardImage className="img-fluid" src={require("../../../images/sliit-walk.JPG")} waves/>
            </MDBCard>
            <MDBCard className="mb-4">
                <MDBCardHeader>Rotaract Club of SLIIT for receiving the award for “Club Efforts in Rotary’s Six Areas of
                    Focus”</MDBCardHeader>
                <MDBCardBody>
                    <p>Congratulations, Rotaract Club of SLIIT for receiving the award for “Club Efforts in Rotary’s Six
                        Areas of Focus” at the Roar South Asia Awards.</p>
                </MDBCardBody>
            </MDBCard>
        </>
    }
}