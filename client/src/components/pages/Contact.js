import React from 'react'
import {
    MDBCard,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBRow,
    MDBCardBody,
    MDBIcon
} from "mdbreact"

import './Contact.css'

export default class Contact extends React.Component {

    handleChange = event => {
        let value = event;
        if (event.target) {
            value = event.target.value;
            this.setState({[event.target.name]: value})
        }
    }

    handleSubmit = event => {

        console.log(this.state)


        // login({username: this.state.username, password: getHash(this.state.password)})
        //     .then(res => {
        //         localStorage.setItem('user', JSON.stringify(res))
        //         this.props.handleClose()
        //     })
        //     .catch(err => {
        //         console.log(err)
        //         this.setState({MDBModalShowErr: true})
        //     })

        event.preventDefault()
        event.stopPropagation()
    }

    render() {
        return (
            <MDBCard>
                <section className="mb-5">
                    <div className="pt-3 white-text" style={{backgroundColor:"#2bbbad"}}>
                        <h2 className="h1-responsive font-weight-bold text-center my-5">
                            Contact us
                        </h2>
                        <p className="text-center w-responsive mx-auto  mb-0">
                            With All Your Inbound Needs
                        </p>
                    </div>
                    <div className="top-diagonal mb-5"></div>
                    <MDBRow>
                        <MDBCol className="mb-4 w-40 ml-2">
                            <MDBCard>
                                <MDBCardBody>
                                    <form onSubmit={this.handleSubmit}>
                                        <h3 className="mt-4">
                                            <MDBIcon icon="envelope" className="pr-2"/>
                                            Write to us:
                                        </h3>
                                        <div className="md-form">
                                            <MDBInput
                                                name="user"
                                                icon="user"
                                                label="Your name"
                                                iconClass="grey-text"
                                                type="text"
                                                id="form-name"
                                                required
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="md-form">
                                            <MDBInput
                                                name="email"
                                                icon="envelope"
                                                label="Your email"
                                                iconClass="grey-text"
                                                type="email"
                                                validate
                                                id="form-email"
                                                required
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="md-form">
                                            <MDBInput
                                                name="subject"
                                                icon="tag"
                                                label="Subject"
                                                iconClass="grey-text"
                                                type="text"
                                                id="form-subject"
                                                required
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="md-form">
                                            <MDBInput
                                                name="content"
                                                icon="pencil-alt"
                                                label="Content"
                                                iconClass="grey-text"
                                                type="textarea"
                                                id="form-text"
                                                required
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="text-center">
                                            <MDBBtn type="submit">Submit</MDBBtn>
                                        </div>
                                    </form>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol className="w-60">
                            <div
                                id="map-container"
                                className="rounded z-depth-1-half map-container mr-2"
                                style={{height: "400px"}}
                            >
                                <iframe
                                    src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;coord=6.9150816,79.97434788935516&amp;q=Sri%20Lanka%20Institute%20of%20Information%20Technology+(SLIIT)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
                                    title="SLIIT"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    style={{border: 0}}
                                />
                            </div>
                            <br/>
                            <MDBRow className="text-center">
                                <MDBCol md="4">
                                    <MDBBtn tag="a" floating color="blue" className="accent-1">
                                        <MDBIcon icon="map-marker-alt"/>
                                    </MDBBtn>
                                    <p>NEW KANDY ROAD, MALABE, SRI LANKA</p>
                                </MDBCol>
                                <MDBCol md="4">
                                    <MDBBtn tag="a" floating color="blue" className="accent-1">
                                        <MDBIcon icon="phone"/>
                                    </MDBBtn>
                                    <p>+94 11 754 4801</p>
                                </MDBCol>
                                <MDBCol md="4">
                                    <MDBBtn tag="a" floating color="blue" className="accent-1">
                                        <MDBIcon icon="envelope"/>
                                    </MDBBtn>
                                    <p>info@sliit.lk</p>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </section>
            </MDBCard>
        )
    }
}