import React, {Component} from 'react'

import {
    MDBModal,
    MDBBtn,
    MDBInput,
    MDBRow,
    MDBCol
} from 'mdbreact'
// import {login} from '../Services'
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
            console.log(value)
        }
        this.setState({[event.target.name]: value})
    }

    handleSubmit = event => {
        this.setState({MDBModalShowErr: false})

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
                <div className="modal-header text-center">
                    <h3 className="modal-title w-100">Sign in</h3>
                    <button type="button" className="close" aria-label="Close" onClick={this.props.toggle}><span
                        aria-hidden="true">×</span>
                    </button>
                </div>
                <MDBRow style={{padding: 30}}>
                    <MDBCol md="12">
                        <form onSubmit={this.handleSubmit}>
                            <MDBRow className="align-items-center justify-content-center">
                                <img src={require("../../images/login.png")} width="30%" className="img-fluid" alt=""/>
                            </MDBRow>
                            <div className="grey-text">
                                <MDBInput
                                    label="Type your username"
                                    icon="envelope"
                                    group
                                    type="text"
                                    validate
                                    error="wrong"
                                    success="right"
                                    name="username"
                                    onChange={this.handleChange}
                                    required
                                />
                                <MDBInput
                                    label="Type your password"
                                    icon="lock"
                                    group
                                    name="password"
                                    type="password"
                                    validate
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="text-center">
                                <MDBBtn type="submit">Login</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBModal>
        );
    }
}

export default Login;