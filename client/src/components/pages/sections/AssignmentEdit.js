import React, {Component} from "react";
import {
    MDBCard,
    MDBCardHeader,
    MDBCol,
    MDBListGroup,
    MDBRow
} from "mdbreact"
import AssignmentEditElement from "./AssignmentEditElement"

import {getAssignments} from "../../functions/Services"

export default class AssignmentEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showErr: false,
            errMsg: "Required fields empty or invalid",
            saved: false,
            assignments: [],
            ...props
        }
    }


    componentDidMount() {
        setTimeout(() => this.readAssignments(), 400)
    }

    readAssignments = () => {
        console.log(this.props.cid)
        getAssignments(this.props.cid)
            .then(async res => {
                var assignments = []
                await res.assignments.map((item, i) => {
                    return assignments.push(
                        <AssignmentEditElement key={i} item={item} cid={this.props.cid}/>
                    )
                })
                this.setState({assignments: assignments})
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return <MDBRow>
            <MDBCol md="12 mt-2">
                <MDBCard className="mb-4">
                    <MDBCardHeader>Edit Assignment / Exam</MDBCardHeader>
                    <MDBListGroup className="list-group-flush" style={{width: "100"}}>
                        {this.state.assignments}
                    </MDBListGroup>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    }
}

