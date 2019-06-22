import {Component} from "react";
import {
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

export default class CourseMaterialsView extends Component {

    state = {
        saved: false
    }

    handleSubmit = event => {
        console.log(this.state)
        event.preventDefault()
        event.stopPropagation()
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
                        <MDBListGroup className="list-group-flush" style={{width: "100"}}>
                            <MDBListGroupItem className="ml-3 mr-3">
                                <MDBRow className="w-100">
                                    <MDBCol md={6} className="pl-5">
                                        <MDBIcon icon="file-alt" className="mr-3"/>
                                        <a href="">Lecture1.ppt</a>
                                    </MDBCol>
                                </MDBRow>
                            </MDBListGroupItem>
                            <MDBListGroupItem className="ml-3 mr-3">
                                <MDBRow className="w-100">
                                    <MDBCol md={6} className="pl-5">
                                        <MDBIcon icon="file-alt" className="mr-3"/>
                                        <a href="">Lecture2.ppt</a>
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