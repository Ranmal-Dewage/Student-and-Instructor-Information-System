import {Component} from "react";
import {MDBBtn, MDBCol, MDBInput, MDBListGroupItem, MDBRow} from "mdbreact"
import DatePicker from "react-datepicker"
import {StyledDropzone} from "../../functions/StyledDropzone"
import React from "react";

export default class SubmitAssignment extends Component {

    state = {
        showErr: false,
        errMsg: "Required fields empty or invalid",
        saved: false
    }

    getFiles = acceptedFiles => {
        const data = new FormData()
        for (var x = 0; x < acceptedFiles.length; x++) {
            data.append('files', acceptedFiles[x])
        }
        this.setState({files: data, saved: true})
    }

    handleSubmit = event => {
        if (this.state.files) {
            console.log(this.state)
        }
        this.setState({showErr: false})
        event.preventDefault()
        event.stopPropagation()
    }

    render() {
        return <MDBListGroupItem>
            <MDBRow className="w-100">
                <MDBCol md={6}>
                    <MDBInput
                        label="Topic"
                        required
                        name="topic"
                        error="wrong"
                        success="right"
                        value={"topic from service"}
                        disabled
                    />
                </MDBCol>
                <MDBCol md={6} className="text-right">
                    <label className="grey-text mr-3">Due Date</label><br/>
                    <DatePicker
                        className="form-control"
                        minDate={new Date()}
                        value={"2019-06-23"}
                        placeholderText="YYYY-MM-DD"
                        disabled
                    />
                </MDBCol>
            </MDBRow>
            <MDBRow className="w-100">
                <MDBCol md={12}>
                    <label className="grey-text pt-1">Upload Files</label>
                    <StyledDropzone getFiles={this.getFiles} saved={this.state.saved}/>
                </MDBCol>
            </MDBRow>
            <MDBRow className="w-100">
                <MDBCol md={12} className="text-right">
                    <MDBBtn size="sm" color="indigo" onClick={this.handleSubmit}>Upload answer</MDBBtn>
                </MDBCol>
            </MDBRow>
        </MDBListGroupItem>;
    }
}