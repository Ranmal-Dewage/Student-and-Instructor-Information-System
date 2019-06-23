import React from 'react'
import {MDBListGroup, MDBListGroupItem} from "mdbreact"
import {getFaculties} from '../../functions/Services'

export default class FacultyList extends React.Component {

    state = {
        faculties: []
    }

    handleClick = id => {
        window.location = '/faculties/' + id + '/degrees'
    }

    componentDidMount() {
        getFaculties()
            .then(res => {
                const faculties = []
                res.faculties.map((faculty, i) => {
                    return faculties.push(
                        <MDBListGroupItem
                            key={i}
                            onClick={() => this.handleClick(faculty.fcode)}>{faculty.fname}
                        </MDBListGroupItem>
                    )
                })
                this.setState({faculties: faculties})
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <MDBListGroup className="list-group-flush" style={{width: "100"}}>
                {this.state.faculties}
            </MDBListGroup>
        )
    }
}