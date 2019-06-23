import React, {Component} from "react";
import {MDBCard, MDBCardHeader, MDBCol, MDBListGroup, MDBRow} from "mdbreact"
import SubmitAssignment from './SubmitAssignment'
import {getAssignments} from "../../functions/Services"

export default class AssignmentView extends Component {

    state = {
        assignments: []
    }

    componentDidMount() {
        setTimeout(() => this.readAssignments(), 400)
    }

    readAssignments = () => {
        getAssignments(this.props.cid)
            .then(async res => {
                var assignments = []
                await res.assignments.map((item, i) => {
                    return assignments.push(
                        <SubmitAssignment key={i} assignment={item} cid={this.props.cid}/>
                    )
                })
                this.setState({assignments: assignments})
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <MDBRow>
                <MDBCol md="12 mt-2">
                    <MDBCard className="mb-4">
                        <MDBCardHeader>Edit Assignment / Exam</MDBCardHeader>
                        <MDBListGroup className="list-group-flush" style={{width: "100"}}>
                            {this.state.assignments}
                        </MDBListGroup>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </form>
    }
}

