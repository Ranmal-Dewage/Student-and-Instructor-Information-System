import {Component} from "react";
import {
    MDBBtn,
    MDBCard,
    MDBCardHeader,
    MDBCol,
    MDBRow,
    MDBFileInput,
    MDBListGroupItem,
    MDBListGroup, MDBIcon
} from "mdbreact";
import React from "react";
import {StyledDropzone} from "../../functions/StyledDropzone"
import config from "../../functions/config"
import {getCourseMaterials} from "../../functions/Services"

export default class CourseMaterials extends Component {

    state = {
        saved: false
    }

    handleSubmit = event => {
        if (this.state.files) {
            fetch(config.nodeBaseUrl + '/courses/' + this.props.cid + "/materials", {
                method: 'PUT',
                body: this.state.files,
            }).then(res => {

            }).catch(err => {
                console.log(err)
                this.setState({MDBModalShowErr: true})
            })
        }
        event.preventDefault()
        event.stopPropagation()
    }

    getMeterials = () => {
        getCourseMaterials(this.props.cid)
            .then(res => {

            })
            .catch(err => {
                console.log(err)
            })
    }

    getFiles = acceptedFiles => {
        const data = new FormData()
        for (var x = 0; x < acceptedFiles.length; x++) {
            data.append('files', acceptedFiles[x])
        }
        this.setState({files: data, saved: true})
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
                                    <label className="grey-text pt-1">Upload Files</label>
                                    <StyledDropzone getFiles={this.getFiles} saved={this.state.saved}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className="w-75">
                                <MDBCol className="text-right">
                                    <MDBBtn className="mr-0 mt-3" color="indigo" type="submit"
                                            onClick={this.handleSubmit}>Upload</MDBBtn>
                                </MDBCol>
                            </MDBRow>
                        </MDBRow>

                        <MDBListGroup className="list-group-flush" style={{width: "100"}}>
                            <MDBListGroupItem className="ml-3 mr-3">
                                <MDBRow className="w-100">
                                    <MDBCol md={6} className="pl-5">
                                        <MDBIcon icon="file-alt" className="mr-3"/>
                                        <a href="">Lecture1.ppt</a>
                                    </MDBCol>
                                    <MDBCol md={6} className="text-right">
                                        <MDBBtn size="sm" color="red">Delete</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </MDBListGroupItem>
                            <MDBListGroupItem className="ml-3 mr-3">
                                <MDBRow className="w-100">
                                    <MDBCol md={6} className="pl-5">
                                        <MDBIcon icon="file-alt" className="mr-3"/>
                                        <a href="">Lecture2.ppt</a>
                                    </MDBCol>
                                    <MDBCol md={6} className="text-right">
                                        <MDBBtn size="sm" color="red">Delete</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </MDBListGroupItem>
                        </MDBListGroup>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </form>;
    }
}