import React from 'react'

export default class CourseView extends React.Component {

    state = {
        cid: ''
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params) {
            this.setState({cid: this.props.match.params.id})
        } else {
            this.props.history.push('/courses/404')
        }
    }

    render() {
        return (
            <div>CourseView : {this.state.cid}</div>
        )
    }
}