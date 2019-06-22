import React, {Component} from "react";
import {MDBBtn, MDBCard, MDBCardHeader, MDBCol, MDBInput, MDBListGroup, MDBListGroupItem, MDBRow} from "mdbreact"
import DatePicker from "react-datepicker"
import moment from 'moment'
import config from "../../functions/config";

export default class AssignmentEdit extends Component {

    state = {
        showErr: false,
        errMsg: "Required fields empty or invalid",
        saved: false
    }

    handleChange = event => {
        let value = event;
        if (event.target) {
            value = event.target.value;
            this.setState({[event.target.name]: value})
        }
    }

    handleSubmit = event => {
        this.setState({showErr: false})
        const body = {
            data: this.state.files,
            topic: this.state.topic,
            description: this.state.description,
            date: this.state.date
        }
        if (this.state.date) {
            fetch(config.springBaseUrl + '/mala', {
                method: 'POST',
                body: this.state.files
            })
                .then(res => {
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            this.setState({showErr: true})
        }
        event.preventDefault()
        event.stopPropagation()
    }

    handleDateChange = dt => {
        const date = moment(dt).format('YYYY-MM-DD')
        this.setState({date: date})
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <MDBRow>
                <MDBCol md="12 mt-2">
                    <MDBCard className="mb-4">
                        <MDBCardHeader>Edit Assignment / Exam</MDBCardHeader>
                        <MDBListGroup className="list-group-flush" style={{width: "100"}}>
                            <MDBListGroupItem>
                                <MDBRow className="w-100">
                                    <MDBCol md={6}>
                                        <MDBInput
                                            label="Topic"
                                            required
                                            name="topic"
                                            error="wrong"
                                            success="right"
                                            onChange={this.handleChange}
                                            value={"topic from service"}
                                            disabled
                                        />
                                    </MDBCol>
                                    <MDBCol md={6} className="text-right">
                                        <label className="grey-text mr-3">Due Date</label><br/>
                                        <DatePicker
                                            className="form-control"
                                            onChange={this.handleDateChange}
                                            minDate={new Date()}
                                            value={this.state.date}
                                            placeholderText="YYYY-MM-DD"
                                            reqired
                                        />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="w-100">
                                    <MDBCol md={12} className="text-right">
                                        <MDBBtn size="sm" color="indigo">Update</MDBBtn>
                                        <MDBBtn size="sm" color="red">Delete</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </MDBListGroupItem>
                            <MDBListGroupItem>
                                <MDBRow className="w-100">
                                    <MDBCol md={6}>
                                        <MDBInput
                                            label="Topic"
                                            required
                                            name="topic"
                                            error="wrong"
                                            success="right"
                                            onChange={this.handleChange}
                                            value={"topic from service"}
                                            disabled
                                        />
                                    </MDBCol>
                                    <MDBCol md={6} className="text-right">
                                        <label className="grey-text mr-3">Due Date</label><br/>
                                        <DatePicker
                                            className="form-control"
                                            onChange={this.handleDateChange}
                                            minDate={new Date()}
                                            value={this.state.date}
                                            placeholderText="YYYY-MM-DD"
                                            reqired
                                        />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="w-100">
                                    <MDBCol md={12} className="text-right">
                                        <MDBBtn size="sm" color="indigo">Update</MDBBtn>
                                        <MDBBtn size="sm" color="red">Delete</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </MDBListGroupItem>
                        </MDBListGroup>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </form>
    }
}

