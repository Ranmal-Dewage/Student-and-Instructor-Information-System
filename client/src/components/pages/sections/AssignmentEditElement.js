import {Component} from "react";
import {MDBBtn, MDBCol, MDBInput, MDBListGroupItem, MDBRow} from "mdbreact";
import DatePicker from "react-datepicker";
import React from "react";
import {updateAssignments} from "../../functions/Services"
import {toast} from "react-toastify"
import moment from 'moment'

export default class AssignmentEditElement extends Component {

    state = {...this.props.item}

    componentDidMount() {
        // setTimeout(() => this.setState({...this.props.item}), 400)
    }

    handleDateChange = dt => {
        const date = moment(dt).format('YYYY-MM-DD')
        this.setState({dueDate: date})
    }

    handleUpdate = id => {
        if (this.state.dueDate && this.state.dueDate !== this.props.item.dueDate) {
            updateAssignments(this.props.cid, id, {dueDate: this.state.dueDate})
                .then(res => {
                    toast.success("Assignment updated")
                })
                .catch(err => {
                    console.log(err)
                    toast.error("Server error")
                })
        } else {
            toast.error("Nothing to change")
        }
    }

    render() {
        return <MDBListGroupItem>
            <MDBRow className="w-100">
                <MDBCol md={6}>
                    <MDBInput
                        label="Topic"
                        required
                        name="topic"
                        error="wrong"
                        success="right"
                        value={this.props.item.topic}
                        disabled
                    />
                </MDBCol>
                <MDBCol md={6} className="text-right">
                    <label className="grey-text mr-3">Due Date</label><br/>
                    <DatePicker
                        className="form-control"
                        onChange={this.handleDateChange}
                        minDate={new Date(this.props.item.dueDate)}
                        value={this.state.dueDate}
                        placeholderText="YYYY-MM-DD"
                        reqired
                    />
                </MDBCol>
            </MDBRow>
            <MDBRow className="w-100">
                <MDBCol md={12} className="text-right">
                    <MDBBtn size="sm" color="indigo"
                            onClick={() => this.handleUpdate(this.props.item._id)}>Update</MDBBtn>
                </MDBCol>
            </MDBRow>
        </MDBListGroupItem>;
    }
}