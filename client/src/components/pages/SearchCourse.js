import React from 'react'
import qs from 'query-string'
import {
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCol,
    MDBCollapse,
    MDBListGroup,
    MDBListGroupItem,
    MDBRow
} from "mdbreact"
import CourseElement from "./sections/CourseElement";

export default class SearchCourse extends React.Component {

    state = {
        name: '',
        collapseID: ''
    }

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    }

    componentDidMount() {
        const name = qs.parse(this.props.location.search).name
        if (name) {
            this.setState({name})
        }
    }

    render() {
        return (
            <MDBRow className="mb-4">
                <MDBCol md="12" className="mb-4">
                    <MDBCard className="mb-4">
                        <MDBCardHeader>Search results for course : {this.state.name}</MDBCardHeader>
                        <MDBCardBody>
                            <MDBListGroup className="list-group-flush">
                                <a href="#!">
                                    <MDBListGroupItem>
                                        <div onClick={this.toggleCollapse("se3045")}>Software architecture
                                            <div className="float-right"><i className="fa fa-angle-down"
                                                                            style={{paddingLeft: 5}}/>
                                            </div>
                                        </div>
                                        <MDBCollapse id="se3045" isOpen={this.state.collapseID}>
                                            <CourseElement/>
                                        </MDBCollapse>
                                    </MDBListGroupItem>
                                </a>
                            </MDBListGroup>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        )
    }
}