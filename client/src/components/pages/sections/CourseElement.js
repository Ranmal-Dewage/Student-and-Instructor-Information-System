import {MDBCol, MDBCard, MDBCardBody, MDBCardText, MDBBtn, MDBInput, MDBFormInline} from "mdbreact"
import React, {Component} from "react"
import {updateUser} from '../../functions/Services'
import {toast} from "react-toastify";

export default class CourseElement extends Component {

    state = {
        ek: ''
    }

    handleChange = event => {
        let value = event;
        if (event.target) {
            value = event.target.value;
        }
        this.setState({[event.target.name]: value})
    }

    handleSubmit = event => {
        if (this.state.ek === this.props.course.ccode) {
            var user = localStorage.getItem('sis-user')
            if (user) {
                user = JSON.parse(user)
            }
            const body = {
                id: user.id,
                courses: user.courses ? [...user.courses, this.props.course.ccode] : [this.props.course.ccode]
            }
            updateUser(body)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            toast.error("Invalid enrollment key!!!")
        }
        event.preventDefault()
        event.stopPropagation()
    }

    render() {
        return (
            <MDBCol className="my-3">
                <MDBCard>
                    <MDBCardBody>
                        <MDBCardText>
                            {this.props.course.description}
                        </MDBCardText>
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
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        )
    }
}