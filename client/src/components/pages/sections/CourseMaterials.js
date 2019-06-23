import {Component} from "react";
import {
    MDBBtn,
    MDBCard,
    MDBCardHeader,
    MDBCol,
    MDBRow,
    MDBListGroupItem,
    MDBListGroup, MDBIcon
} from "mdbreact";
import React from "react";
import {StyledDropzone} from "../../functions/StyledDropzone"
import config from "../../functions/config"
import {getCourseMaterials, deleteCourseMaterials} from "../../functions/Services"
import {toast} from "react-toastify";

export default class CourseMaterials extends Component {

    state = {
        saved: false,
        materials: [],
    }

    componentDidMount() {
        setTimeout(() => this.getMeterials(), 400)
    }

    handleSubmit = event => {
        if (this.state.files) {
            fetch(config.fileService + "/files/many", {
                method: 'POST',
                body: this.state.files,
            }).then(res => {
                return res.json()
            }).then(data => {
                fetch(config.nodeBaseUrl + '/courses/' + this.props.cid + "/materials", {
                    method: 'POST',
                    body: JSON.stringify({data: data}),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                }).then(res => {
                    toast.success("Successfully added course materials")
                    this.getMeterials()
                })
            }).catch(err => {
                console.log(err)
                toast.error("Unable to add course materials")
            })
        } else {
            toast.error("please select and save files")
        }
        event.preventDefault()
        event.stopPropagation()
    }

    handleDelete = (id) => {
        deleteCourseMaterials(this.props.cid, id)
            .then(res => {
                this.getMeterials()
                toast.success("Successfully deleted course materials")
            })
            .catch(err => {
                console.log(err)
                toast.error("Unable to delete course materials")
            })
    }

    getMeterials = () => {
        getCourseMaterials(this.props.cid)
            .then(async res => {
                var materials = []
                await res.materials.map((item, i) => {
                    return materials.push(
                        <MDBListGroupItem key={i} className="ml-3 mr-3">
                            <MDBRow className="w-100">
                                <MDBCol md={6} className="pl-5">
                                    <MDBIcon icon="file-alt" className="mr-3"/>
                                    <a href={item.fileDownloadUri}>{item.fileName}</a>
                                </MDBCol>
                                <MDBCol md={6} className="text-right">
                                    <MDBBtn size="sm" color="red"
                                            onClick={() => this.handleDelete(item.fileName)}>Delete</MDBBtn>
                                </MDBCol>
                            </MDBRow>
                        </MDBListGroupItem>
                    )
                })
                this.setState({materials: materials})
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
                            {this.state.materials}
                        </MDBListGroup>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </form>;
    }
}