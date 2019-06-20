import React, {Component} from 'react'

import {
    MDBModal,
    MDBBtn,
    MDBInput,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody
} from 'mdbreact'
import {getHash} from '../functions/Functions'
import {login} from '../functions/Services'
// import {getHash} from './commons/Functions'

class Login extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            // validated: false,
            MDBModalShowErr: false,
            MDBModalErrMsg: "Incorrect username or password!!!",
            username: "",
            password: ""
        }
        this.baseState = this.state
    }

    componentWillUnmount() {
        this.setState(this.baseState)
    }

    handleChange = event => {
        let value = event;
        if (event.target) {
            value = event.target.value;
        }
        this.setState({[event.target.name]: value})
    }

    handleSubmit = event => {
        this.setState({MDBModalShowErr: false})
        console.log(this.state)
        console.log(getHash(this.state.password))

        login(this.state,"Bearer tojanscasvmsakdnauishdkjsbd").then(data=>console.log(data))

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
            <MDBModal isOpen={this.props.modal} toggle={this.props.toggle}>
                <MDBRow>
                    <MDBCol md="12">
                        <MDBCard>
                            <div className="header pt-3 grey lighten-2">
                                <MDBRow className="d-flex justify-content-start">
                                    <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                                        Log in
                                    </h3>
                                </MDBRow>
                            </div>
                            <MDBCardBody className="mx-4 mt-4">
                                <form onSubmit={this.handleSubmit}>
                                    <MDBInput label="Your email"
                                              type="email"
                                              validate
                                              name="email"
                                              icon="envelope"
                                              onChange={this.handleChange}
                                              required
                                    />
                                    <MDBInput
                                        label="Your password"
                                        group
                                        name="password"
                                        type="password"
                                        icon="lock"
                                        validate
                                        containerClass="mb-0"
                                        onChange={this.handleChange}
                                        required
                                    />
                                    <div className="text-center mb-4 mt-5">
                                        <MDBBtn
                                            color="primary"
                                            type="submit"
                                            className="btn-block z-depth-2"
                                        >
                                            Log in
                                        </MDBBtn>
                                    </div>
                                    <p className="font-small grey-text d-flex justify-content-center">
                                        Don't have an account?
                                        <a
                                            href="/register"
                                            className="dark-grey-text font-weight-bold ml-1"
                                        >
                                            Sign up
                                        </a>
                                    </p>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBModal>
        );
    }
}

export default Login;