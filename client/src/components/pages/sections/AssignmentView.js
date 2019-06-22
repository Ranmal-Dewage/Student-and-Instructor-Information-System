import React, {Component} from "react";
import {MDBCard, MDBCardHeader, MDBCol, MDBListGroup, MDBRow} from "mdbreact"
import SubmitAssignment from './SubmitAssignment'

export default class AssignmentView extends Component {

    state = {}

    render() {
        return <form onSubmit={this.handleSubmit}>
            <MDBRow>
                <MDBCol md="12 mt-2">
                    <MDBCard className="mb-4">
                        <MDBCardHeader>Edit Assignment / Exam</MDBCardHeader>
                        <MDBListGroup className="list-group-flush" style={{width: "100"}}>
                            <SubmitAssignment assignment={"pass ass object"}/>
                            <SubmitAssignment assignment={"pass ass object"}/>
                        </MDBListGroup>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </form>
    }
}

