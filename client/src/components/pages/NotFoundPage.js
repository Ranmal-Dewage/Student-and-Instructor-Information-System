import React from 'react'
import {MDBCol, MDBRow} from 'mdbreact';
import logo from "../../images/SLIIT.png";


export default class NotFoundPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="full">
                    <MDBRow className="bad-gateway-row">
                        <MDBCol md="8">
                            <h2 className="h2-responsive mt-3 mb-2">404. That's an error.</h2>
                            <h4>The requested URL was not found on this server.</h4>
                        </MDBCol>
                        <MDBCol md="4">
                            <img alt="Error 404" className="img-fluid"
                                 src="https://mdbootstrap.com/img/Others/grafika404-bf.png"/>
                        </MDBCol>
                    </MDBRow>
                </div>
            </React.Fragment>
        )
    }
}