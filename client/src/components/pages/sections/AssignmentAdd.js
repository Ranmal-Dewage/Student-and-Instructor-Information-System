import React, {Component, useMemo} from "react";
import {MDBBtn, MDBCard, MDBCardHeader, MDBCol, MDBInput, MDBRow} from "mdbreact"
import {StyledDropzone} from '../../functions/StyledDropzone'
import DatePicker from "react-datepicker"
import moment from 'moment'
import config from "../../functions/config";

export default class AssignmentAdd extends Component {

    state = {
        showErr: false,
        errMsg: "Required fields empty or invalid"
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

    getFiles = acceptedFiles => {
        const data = new FormData()
        for (var x = 0; x < acceptedFiles.length; x++) {
            console.log(acceptedFiles[x])
            data.append('files', acceptedFiles[x])
        }
        this.setState({files: data})
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <MDBRow>
                <MDBCol md="12 mt-2">
                    <MDBCard className="mb-4">
                        <MDBCardHeader>Assignment</MDBCardHeader>
                        <MDBRow className="align-items-center justify-content-center pb-3">
                            <MDBRow className="w-75">
                                <MDBCol md={6}>
                                    <MDBInput
                                        label="Topic"
                                        required
                                        name="topic"
                                        error="wrong"
                                        success="right"
                                        onChange={this.handleChange}
                                    />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className="w-75">
                                <MDBCol md={12}>
                                    <label className="grey-text pt-1">Upload Files</label>
                                    <StyledDropzone getFiles={this.getFiles}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className="w-75 mb-2">
                                <MDBCol md={6}>
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
                            <MDBRow className="w-75">
                                <MDBCol md={12}>
                                    <label className="grey-text">Description</label>
                                    <textarea
                                        name="description"
                                        className="form-control"
                                        rows="4"
                                        onChange={this.handleChange}
                                        required
                                    />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className="w-75 mt-2">
                                <MDBCol>
                                    {this.state.showErr && <p style={{color: 'red'}}>{this.state.errMsg}</p>}
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className="w-75">
                                <MDBCol className="text-right">
                                    <MDBBtn className="mr-0 mt-3" color="indigo" type="submit">Upload</MDBBtn>
                                </MDBCol>
                            </MDBRow>
                        </MDBRow>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </form>;
    }
}

