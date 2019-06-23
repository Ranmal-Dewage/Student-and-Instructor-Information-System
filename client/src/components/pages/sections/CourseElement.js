import {MDBCol, MDBCard, MDBCardBody, MDBCardText, MDBBtn, MDBInput, MDBFormInline} from "mdbreact"
import React, {Component} from "react"
import {updateUser} from '../../functions/Services'
import {toast} from "react-toastify"

export default class CourseElement extends Component {

    state = {
        ek: '',
        user: {}
    }

    handleChange = event => {
        let value = event;
        if (event.target) {
            value = event.target.value;
        }
        this.setState({[event.target.name]: value})
    }

    componentDidMount() {
        var user = localStorage.getItem('sis-user')
        if (user) {
            user = JSON.parse(user)
            this.setState({user})
        }
    }

    handleSubmit = event => {
        if (this.state.user && this.state.user.permissionLevel === 1) {
            if (this.state.ek === this.props.course.ccode) {
                const body = {
                    id: this.state.user.id,
                    courses: this.state.user.courses ? [...this.state.user.courses, this.props.course.ccode] : [this.props.course.ccode]
                }
                updateUser(body)
                    .then(res => {
                        const data = {...this.state.user, courses: body.courses}
                        localStorage.setItem('sis-user', JSON.stringify(data))
                        window.location = "/courses/" + this.props.course.ccode + "/view"
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                toast.error("Invalid enrollment key!!!")
            }
        } else {
            toast.error("Only students can enroll to this course!!!")
        }
        event.preventDefault()
        event.stopPropagation()
    }

    render() {
        const link = "/courses/" + this.props.course.ccode + "/view"
        return (
            <MDBCol className="my-3">
                <MDBCard>
                    <MDBCardBody>
                        <MDBCardText>
                            {this.props.course.description}
                        </MDBCardText>
                        {this.state.user && this.state.user.courses && this.state.user.courses.includes(this.props.course.ccode) ?
                            <p onClick={() => window.location = link} className="text-primary">You have already enrolled
                                to
                                this course</p>
                            :
                            <MDBFormInline onSubmit={this.handleSubmit}>
                                <MDBInput
                                    label="Type enrollment key"
                                    group
                                    name="ek"
                                    type="password"
                                    validate
                                    onChange={this.handleChange}
                                    required
                                />
                                <MDBBtn size="sm" type="submit">Enroll</MDBBtn>
                            </MDBFormInline>
                        }
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        )
    }
}