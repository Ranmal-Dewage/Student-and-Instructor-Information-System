import {Component} from "react";
import {
    MDBCard,
    MDBCardHeader,
    MDBCol,
    MDBRow,
    MDBListGroupItem,
    MDBListGroup, MDBIcon
} from "mdbreact";
import React from "react"
import {getCourseMaterials} from "../../functions/Services"

export default class CourseMaterialsView extends Component {

    state = {
        saved: false,
        materials: []
    }

    componentDidMount() {
        setTimeout(() => this.readMaterials(), 400)
    }

    readMaterials = () => {
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

    render() {
        return <form onSubmit={this.handleSubmit}>
            <MDBRow>
                <MDBCol md="12">
                    <MDBCard className="mb-4">
                        <MDBCardHeader>Course Materials</MDBCardHeader>
                        <MDBListGroup className="list-group-flush" style={{width: "100"}}>
                            {this.state.materials}
                        </MDBListGroup>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </form>;
    }
}