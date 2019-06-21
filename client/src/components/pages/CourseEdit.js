import React, {Component} from 'react'
import {getHash} from "../functions/Functions";
import {register} from "../functions/Services";
import {toast} from "react-toastify";
import {MDBBtn, MDBCard, MDBCardHeader, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdbreact";
import Select from "./Register";
import AssignmentAdd from "./sections/AssignmentAdd";
import CourseMaterials from "./sections/CourseMaterials";

export default class CourseEdit extends React.Component {

    state = {
        cid: '',
        showErr: false,
        errMsg: "Required fields empty or invalid!!!"
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params) {
            this.setState({cid: this.props.match.params.id})
        } else {
            this.props.history.push('/courses/404')
        }
    }

    handleChange = event => {
        let value = event;
        if (event.target) {
            value = event.target.value;
            this.setState({[event.target.name]: value})
        } else {
            this.setState({[event.name]: event.value})
        }

    }

    handleSubmit = event => {
        this.setState({showErr: false})

        event.preventDefault()
        event.stopPropagation()
    }

    render() {
        return (
            <MDBContainer>
                <AssignmentAdd cid={this.state.cid}/>
                <CourseMaterials cid={this.state.cid}/>
            </MDBContainer>
        )
    }
}