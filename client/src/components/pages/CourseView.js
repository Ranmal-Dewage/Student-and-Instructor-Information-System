import React from 'react'
import {MDBContainer} from "mdbreact"
import CourseMaterialsView from "./sections/CourseMaterialsView"
import AssignmentView from "./sections/AssignmentView"

export default class CourseView extends React.Component {

    state = {
        cid: ''
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params) {
            this.setState({cid: this.props.match.params.id})
        } else {
            this.props.history.push('/courses/404')
        }
    }

    render() {
        return (
            <MDBContainer>
                <AssignmentView cid={this.state.cid}></AssignmentView>
                <CourseMaterialsView cid={this.state.cid}></CourseMaterialsView>
            </MDBContainer>
        )
    }
}