import {MDBCol, MDBCard, MDBCardBody, MDBCardText, MDBBtn, MDBInput, MDBFormInline} from "mdbreact"
import React, {Component} from "react"

export default class CourseElement extends Component {

    state = {
        ek: ''
    }

    componentDidMount() {
        //TODO get course description
    }

    handleChange = event => {
        let value = event;
        if (event.target) {
            value = event.target.value;
        }
        this.setState({[event.target.name]: value})
    }

    handleSubmit = event => {

        event.preventDefault()
        event.stopPropagation()
    }

    render() {
        return (
            <MDBCol className="my-3">
                <MDBCard>
                    <MDBCardBody>
                        <MDBCardText>
                            Some description about the course
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