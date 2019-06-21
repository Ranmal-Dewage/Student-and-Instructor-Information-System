import {Component} from "react";
import {MDBBtn, MDBCard, MDBCardHeader, MDBCol, MDBInput, MDBRow, MDBFileInput} from "mdbreact";
import React from "react";

export default class CourseMaterials extends Component {

    state = {}

    handleChange = event => {
        let value = event;
        if (event.target) {
            value = event.target.value;
            this.setState({[event.target.name]: value})
        }

    }

    handleSubmit = event => {
        this.setState({showErr: false})

        event.preventDefault()
        event.stopPropagation()
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <MDBRow>
                <MDBCol md="12">
                    <MDBCard className="mb-4">
                        <MDBCardHeader>Course Materials</MDBCardHeader>
                        <MDBRow className="align-items-center justify-content-center p-5">
                            <MDBRow className="w-75">
                                <MDBCol md={12}>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="inputGroupFileAddon01">
                                              Upload
                                            </span>
                                        </div>
                                        <div className="custom-file">
                                            <input
                                                type="file"
                                                className="custom-file-input"
                                                id="inputGroupFile01"
                                                aria-describedby="inputGroupFileAddon01"
                                            />
                                            <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                Choose file
                                            </label>
                                        </div>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className="w-75">
                                <MDBCol md={6}>
                                    <MDBInput
                                        label="NIC"
                                        required
                                        name="nic"
                                        error="wrong"
                                        success="right"
                                        onChange={this.handleChange}
                                    />
                                </MDBCol>
                                <MDBCol md={6}>
                                    <MDBInput
                                        label="Phone"
                                        required
                                        name="phone"
                                        error="wrong"
                                        success="right"
                                        onChange={this.handleChange}
                                    />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className="w-75">
                                <MDBCol md={12}>
                                    <label className="grey-text">
                                        Address
                                    </label>
                                    <textarea
                                        name="address"
                                        className="form-control"
                                        rows="4"
                                        onChange={this.handleChange}
                                        required
                                    />
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