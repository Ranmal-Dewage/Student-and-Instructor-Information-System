import React from 'react'
import {MDBCollapse, MDBIcon, MDBListGroup, MDBListGroupItem} from "mdbreact";

export default class FacultyList extends React.Component {

    handleClick = id => {
        window.location = '/faculties/' + id + '/degrees'
    }

    render() {
        return (
            <MDBListGroup className="list-group-flush" style={{width: "100"}}>
                <MDBListGroupItem onClick={() => this.handleClick("IT")}>Faculty of Computing</MDBListGroupItem>
                <MDBListGroupItem onClick={() => this.handleClick("BM")}>Faculty of Business</MDBListGroupItem>
                <MDBListGroupItem onClick={() => this.handleClick("EN")}>Faculty of Engineering</MDBListGroupItem>
                <MDBListGroupItem onClick={() => this.handleClick("HC")}>Faculty of Humanities &
                    Sciences</MDBListGroupItem>
            </MDBListGroup>
        )
    }
}