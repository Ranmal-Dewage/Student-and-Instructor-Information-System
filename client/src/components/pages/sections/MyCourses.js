import React from 'react'
import {MDBListGroup, MDBListGroupItem} from "mdbreact"
import {getCourse} from "../../functions/Services";

export default class MyCourses extends React.Component {

    state = {
        user: {},
        courseList: [],
        courses: []
    }

    componentDidMount() {
        var user = localStorage.getItem('sis-user')
        if (user) {
            user = JSON.parse(user)
            this.setState({user})
            var courses = []
            user.courses.map((course, i) => {
                return courses.push(course)
            })
            courses.map(id => {
                return getCourse(id)
                    .then(res => {
                        this.setState({
                            courses: [...this.state.courses, {
                                name: res.courses[0].cname,
                                id: res.courses[0].ccode
                            }]
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
        }
    }

    handleClick = id => {
        var user = localStorage.getItem('sis-user')
        if (user) {
            user = JSON.parse(user)
            if (user.permissionLevel === 1) {
                window.location = '/courses/' + id + '/view'
            } else if (user.permissionLevel === 2) {
                window.location = '/courses/' + id + '/edit'
            }
        }
    }

    render() {
        return (
            <MDBListGroup className="list-group-flush" style={{width: "100"}}>
                {this.state.courses.map((course, i) => {
                    return <MDBListGroupItem key={i}
                                             onClick={() => this.handleClick(course.id)}>{course.name}</MDBListGroupItem>
                })
                }
            </MDBListGroup>
        )
    }
}