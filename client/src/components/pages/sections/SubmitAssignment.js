import {Component} from "react";
import {MDBBtn, MDBCol, MDBIcon, MDBInput, MDBListGroupItem, MDBRow} from "mdbreact"
import DatePicker from "react-datepicker"
import {StyledDropzone} from "../../functions/StyledDropzone"
import React from "react";
import config from "../../functions/config"
import {toast} from "react-toastify"

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
            if (new Date() < new Date(this.props.assignment.dueDate)) {
                fetch(config.fileService + "/files/many", {
                    method: 'POST',
                    body: this.state.files,
                }).then(res => {
                    return res.json()
                }).then(data => {
                    toast.success("File uploaded")
                }).catch(err => {
                    console.log(err)
                    toast.error("Unable to add assignment")
                })
            } else {
                toast.error("due date exceeded")
            }
        } else {
            toast.error("please select and save files or select data")
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
                        value={this.props.assignment.topic}
                        disabled
                    />
                </MDBCol>
                <MDBCol md={6} className="text-right">
                    <label className="grey-text mr-3">Due Date</label><br/>
                    <DatePicker
                        className="form-control"
                        minDate={new Date()}
                        value={this.props.assignment.dueDate}
                        placeholderText="YYYY-MM-DD"
                        disabled
                    />
                </MDBCol>
            </MDBRow>
            <MDBRow className="w-100 mb-3">
                {
                    this.props.assignment.data.map((item, i) => {
                        return <MDBRow className="w-100">
                            <MDBCol md={6} className="pl-5">
                                <MDBIcon icon="file-alt" className="mr-3"/>
                                <a href={item.fileDownloadUri}>{item.fileName}</a>
                            </MDBCol>
                        </MDBRow>
                    })
                }
            </MDBRow>
            <MDBRow>
                <MDBCol>
                    <p style={{color: 'red'}}>Upload file name should
                        be {this.props.cid}_{this.props.assignment.topic + "_<username>.pdf"}</p>
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