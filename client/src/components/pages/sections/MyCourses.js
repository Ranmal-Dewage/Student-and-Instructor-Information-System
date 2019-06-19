import React from 'react'
import {MDBListGroup, MDBListGroupItem} from "mdbreact";

export default class MyCourses extends React.Component {

    handleClick = id => {
        window.location = '/courses/' + id + '/view'
    }

    render() {
        return (
            <MDBListGroup className="list-group-flush" style={{width: "100"}}>
                <MDBListGroupItem onClick={() => this.handleClick("SE3030")}>Application
                    Frameworks</MDBListGroupItem>
                <MDBListGroupItem onClick={() => this.handleClick("SE3040")}>Software
                    architecture</MDBListGroupItem>
                <MDBListGroupItem onClick={() => this.handleClick("SE4040")}>Distributed
                    Systems</MDBListGroupItem>
                <MDBListGroupItem
                    onClick={() => this.handleClick("SE3330")}>SEPQM</MDBListGroupItem>
                <MDBListGroupItem
                    onClick={() => this.handleClick("SE3020")}>ESD</MDBListGroupItem>
            </MDBListGroup>
        )
    }
}